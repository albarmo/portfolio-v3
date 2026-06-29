import ImageKit from "imagekit";

let _ik: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!_ik) {
    _ik = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
    });
  }
  return _ik;
}

export async function uploadToImageKit(
  file: File,
  folder = "/portfolio"
): Promise<string> {
  const ik = getImageKit();
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await ik.upload({
    file: buffer,
    fileName: file.name,
    folder,
    useUniqueFileName: true,
  });
  return result.url;
}

export async function listFiles(folder = "/portfolio") {
  const ik = getImageKit();
  return ik.listFiles({ path: folder, limit: 100, skip: 0 });
}

export async function deleteFile(fileId: string) {
  const ik = getImageKit();
  return ik.deleteFile(fileId);
}
