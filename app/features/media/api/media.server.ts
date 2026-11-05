import { MEDIA_FOLDER } from "@/constants/upload";
import type { MediaLibraryData } from "@/features/media/types";
import { deleteFile, listFiles, uploadToImageKit } from "@/services/imagekit.server";
import { getFormFile, getFormString } from "@/utils/formData";

export async function getMediaLibrary(): Promise<MediaLibraryData> {
  try {
    const items = await listFiles(MEDIA_FOLDER);
    const files = items.flatMap((item) =>
      item.type === "folder" ? [] : [{ fileId: item.fileId, name: item.name, url: item.url, size: item.size }],
    );
    return { files, error: null };
  } catch (error) {
    console.error("[media] listing ImageKit files failed", error);
    return { files: [], error: "Failed to load files from ImageKit." };
  }
}

/** Handles both the upload and delete forms of the media library */
export async function handleMediaAction(form: FormData): Promise<void> {
  const intent = getFormString(form, "intent");
  if (intent === "delete") {
    const fileId = getFormString(form, "fileId");
    if (fileId) await deleteFile(fileId);
    return;
  }
  if (intent === "upload") {
    const file = getFormFile(form, "file");
    if (file) await uploadToImageKit(file, MEDIA_FOLDER);
  }
}
