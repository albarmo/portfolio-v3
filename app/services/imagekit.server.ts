import ImageKit from "imagekit";
import { MEDIA_FOLDER, MEDIA_LIST_LIMIT } from "@/constants/upload";
import { env } from "@/services/env.server";

let imageKit: ImageKit | null = null;

function getImageKit(): ImageKit {
  imageKit ??= new ImageKit({
    publicKey: env.imagekitPublicKey,
    privateKey: env.imagekitPrivateKey,
    urlEndpoint: env.imagekitUrlEndpoint,
  });
  return imageKit;
}

export async function uploadToImageKit(file: File, folder = MEDIA_FOLDER): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await getImageKit().upload({
    file: buffer,
    fileName: file.name,
    folder,
    useUniqueFileName: true,
  });
  return result.url;
}

export async function listFiles(folder = MEDIA_FOLDER) {
  return getImageKit().listFiles({ path: folder, limit: MEDIA_LIST_LIMIT, skip: 0 });
}

export async function deleteFile(fileId: string) {
  return getImageKit().deleteFile(fileId);
}
