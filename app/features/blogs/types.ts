export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  slug: string;
  thumbnail: string;
  content: string;
}

/** Fields an admin can edit, as submitted by the blog form */
export type BlogPayload = Omit<BlogPost, "id">;
