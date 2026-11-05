export interface MediaFile {
  fileId: string;
  name: string;
  url: string;
  size: number;
}

export interface MediaLibraryData {
  files: MediaFile[];
  error: string | null;
}
