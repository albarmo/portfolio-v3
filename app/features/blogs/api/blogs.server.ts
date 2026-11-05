import { data } from "react-router";
import { COLLECTIONS } from "@/constants/collections";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { SITE_NAME } from "@/constants/site";
import { BLOG_SEED } from "@/features/blogs/api/blogSeed";
import type { BlogPayload, BlogPost } from "@/features/blogs/types";
import { getDb } from "@/services/db.server";
import { uploadToImageKit } from "@/services/imagekit.server";
import { getFormFile, getFormString } from "@/utils/formData";

const COLLECTION = COLLECTIONS.blogs;
const THUMBNAIL_FOLDER = "/portfolio/blogs";

async function getCollection() {
  const db = await getDb();
  const collection = db.collection<BlogPost>(COLLECTION);
  await collection.createIndex({ id: 1 }, { unique: true });
  await collection.createIndex({ slug: 1 }, { unique: true });
  await collection.bulkWrite(
    BLOG_SEED.map((blog) => ({
      updateOne: { filter: { id: blog.id }, update: { $setOnInsert: { ...blog } }, upsert: true },
    })),
    { ordered: false },
  );
  return collection;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getBlogs({ page = 1, limit = DEFAULT_PAGE_SIZE } = {}): Promise<BlogPost[]> {
  try {
    const collection = await getCollection();
    return await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
  } catch (error) {
    console.error("[blogs] getBlogs failed, serving seed data", error);
    return BLOG_SEED;
  }
}

/** Admin listing: every post, no seed fallback so DB problems surface */
export async function getAllBlogs(): Promise<BlogPost[]> {
  const collection = await getCollection();
  return collection.find({}, { projection: { _id: 0 } }).sort({ date: -1 }).toArray();
}

/** Accepts either the post id or its slug */
export async function getBlog(idOrSlug: string): Promise<BlogPost> {
  let blog: BlogPost | null | undefined;
  try {
    const collection = await getCollection();
    blog = await collection.findOne({ $or: [{ id: idOrSlug }, { slug: idOrSlug }] }, { projection: { _id: 0 } });
  } catch (error) {
    console.error(`[blogs] getBlog(${idOrSlug}) failed, serving seed data`, error);
    blog = BLOG_SEED.find((seed) => seed.id === idOrSlug || seed.slug === idOrSlug);
  }
  if (!blog) throw data(null, { status: 404, statusText: "Blog post not found" });
  return blog;
}

async function isSlugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const collection = await getCollection();
  const existing = await collection.findOne({ slug }, { projection: { id: 1 } });
  return existing !== null && existing.id !== exceptId;
}

export async function createBlog(payload: BlogPayload): Promise<void> {
  const collection = await getCollection();
  await collection.insertOne({ ...payload, id: String(Date.now()) });
}

export async function updateBlog(id: string, payload: BlogPayload): Promise<void> {
  const collection = await getCollection();
  await collection.updateOne({ id }, { $set: payload });
}

export async function deleteBlog(id: string): Promise<void> {
  const collection = await getCollection();
  await collection.deleteOne({ id });
}

/**
 * Validates the admin form (including slug uniqueness) and uploads a new
 * thumbnail only once the input is valid. Pass `currentId` when editing.
 */
export async function readBlogForm(
  form: FormData,
  currentId?: string,
): Promise<{ payload: BlogPayload; error?: never } | { error: string; payload?: never }> {
  const title = getFormString(form, "title");
  const summary = getFormString(form, "summary");
  const date = getFormString(form, "date");
  const content = getFormString(form, "content");
  if (!title || !summary || !date || !content) {
    return { error: "Title, summary, date, and content are required." };
  }

  const slug = slugify(getFormString(form, "slug") || title);
  if (await isSlugTaken(slug, currentId)) {
    return { error: `Slug "${slug}" already exists. Change the title or slug.` };
  }

  const thumbnailFile = getFormFile(form, "thumbnailFile");
  const thumbnail = thumbnailFile
    ? await uploadToImageKit(thumbnailFile, THUMBNAIL_FOLDER)
    : getFormString(form, "thumbnail");

  return {
    payload: {
      title,
      summary,
      date,
      content,
      thumbnail,
      author: getFormString(form, "author") || SITE_NAME,
      slug,
    },
  };
}
