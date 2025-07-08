export const readFileAsBase64 = (fileAsBase64: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;
    reader?.readAsDataURL(fileAsBase64);
  });
};

export const sanitizeFileAsBase64 = (fileAsBase64: string) => {
  if (!fileAsBase64) return;
  return fileAsBase64?.split(",")[1];
};
