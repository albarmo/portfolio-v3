/** Shape stored in MongoDB: list fields are JSON array strings */
export interface ProjectDocument {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  brief: string;
  result: string;
  thumbnail: string;
  url: string;
  repoUrl: string;
  gifUrl: string;
  techStack: string;
  responsibility: string;
  /** one-line outcome shown on the home page card */
  highlight?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/** View model used by the UI: list fields already parsed */
export interface Project extends Omit<ProjectDocument, "techStack" | "responsibility"> {
  techStack: string[];
  responsibilities: string[];
}

/** Fields an admin can edit, as submitted by the project form */
export type ProjectPayload = Omit<ProjectDocument, "id" | "highlight" | "createdAt" | "updatedAt">;
