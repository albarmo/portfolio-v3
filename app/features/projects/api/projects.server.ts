import { data } from "react-router";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { PROJECT_SEED } from "@/features/projects/api/projectSeed";
import type { Project, ProjectDocument, ProjectPayload } from "@/features/projects/types";
import { getDb } from "@/services/db.server";
import { uploadToImageKit } from "@/services/imagekit.server";
import { getFormFile, getFormString, splitList } from "@/utils/formData";
import { parseStringList } from "@/utils/stringList";

const COLLECTION = "projects";
const THUMBNAIL_FOLDER = "/portfolio/projects";

function toProject({ techStack, responsibility, ...rest }: ProjectDocument): Project {
  return {
    ...rest,
    techStack: parseStringList(techStack),
    responsibilities: parseStringList(responsibility),
  };
}

async function getCollection() {
  const db = await getDb();
  const collection = db.collection<ProjectDocument>(COLLECTION);
  if ((await collection.countDocuments()) === 0) {
    await collection.insertMany(PROJECT_SEED.map((project) => ({ ...project })));
    await collection.createIndex({ id: 1 }, { unique: true });
  }
  return collection;
}

export async function getProjects({ page = 1, limit = DEFAULT_PAGE_SIZE } = {}): Promise<Project[]> {
  try {
    const collection = await getCollection();
    const documents = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ year: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    // documents seeded before `highlight` existed get it from the seed copy
    return documents.map((document) =>
      toProject({
        ...document,
        highlight: document.highlight ?? PROJECT_SEED.find((seed) => seed.id === document.id)?.highlight,
      }),
    );
  } catch (error) {
    console.error("[projects] getProjects failed, serving seed data", error);
    return PROJECT_SEED.map(toProject);
  }
}

/** Admin listing: every project, no seed fallback so DB problems surface */
export async function getAllProjects(): Promise<Project[]> {
  const collection = await getCollection();
  const documents = await collection.find({}, { projection: { _id: 0 } }).sort({ year: -1 }).toArray();
  return documents.map(toProject);
}

export async function getProject(id: string): Promise<Project> {
  let document: ProjectDocument | null | undefined;
  try {
    const collection = await getCollection();
    document = await collection.findOne({ id }, { projection: { _id: 0 } });
  } catch (error) {
    console.error(`[projects] getProject(${id}) failed, serving seed data`, error);
    document = PROJECT_SEED.find((seed) => seed.id === id);
  }
  if (!document) throw data(null, { status: 404, statusText: "Project not found" });
  return toProject(document);
}

export async function createProject(payload: ProjectPayload): Promise<void> {
  const collection = await getCollection();
  const now = new Date().toISOString();
  await collection.insertOne({ ...payload, id: crypto.randomUUID(), createdAt: now, updatedAt: now });
}

export async function updateProject(id: string, payload: ProjectPayload): Promise<void> {
  const collection = await getCollection();
  await collection.updateOne({ id }, { $set: { ...payload, updatedAt: new Date().toISOString() } });
}

export async function deleteProject(id: string): Promise<void> {
  const collection = await getCollection();
  await collection.deleteOne({ id });
}

/** Validates the admin form and uploads a new thumbnail only once the input is valid */
export async function readProjectForm(
  form: FormData,
): Promise<{ payload: ProjectPayload; error?: never } | { error: string; payload?: never }> {
  const title = getFormString(form, "title");
  const category = getFormString(form, "category");
  const year = getFormString(form, "year");
  if (!title || !category || !year) {
    return { error: "Title, category, and year are required." };
  }

  const thumbnailFile = getFormFile(form, "thumbnailFile");
  const thumbnail = thumbnailFile
    ? await uploadToImageKit(thumbnailFile, THUMBNAIL_FOLDER)
    : getFormString(form, "thumbnail");

  return {
    payload: {
      title,
      category,
      year,
      description: getFormString(form, "description"),
      brief: getFormString(form, "brief"),
      result: getFormString(form, "result"),
      thumbnail,
      url: getFormString(form, "url"),
      repoUrl: getFormString(form, "repoUrl"),
      gifUrl: getFormString(form, "gifUrl"),
      techStack: JSON.stringify(splitList(getFormString(form, "techStack"), ",")),
      responsibility: JSON.stringify(splitList(getFormString(form, "responsibility"), "\n")),
    },
  };
}
