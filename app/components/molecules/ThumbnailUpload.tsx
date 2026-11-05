import { useState, useRef } from "react";
import { UploadCloudIcon, XIcon, ImageIcon } from "lucide-react";

interface ThumbnailUploadProps {
  currentUrl?: string | undefined;
  fieldName?: string;
  urlFieldName?: string;
}

export function ThumbnailUpload({
  currentUrl = "",
  fieldName = "thumbnailFile",
  urlFieldName = "thumbnail",
}: ThumbnailUploadProps) {
  const [preview, setPreview] = useState<string>(currentUrl);
  const [urlInput, setUrlInput] = useState<string>(currentUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUrlInput(""); // clear manual URL when file is chosen
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clearSelection = () => {
    setPreview("");
    setUrlInput("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div role="group" aria-labelledby="thumbnail-label" className="border-b border-border">
      <div id="thumbnail-label" className="border-b border-border bg-surface px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-muted">
        THUMBNAIL
      </div>

      <div className="p-3 space-y-3">
        {/* Preview */}
        {preview && (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Thumbnail preview"
              className="h-28 w-auto border border-border object-cover"
              onError={() => setPreview("")}
            />
            <button
              type="button"
              onClick={clearSelection}
              aria-label="Remove thumbnail"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-accent text-white"
            >
              <XIcon className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Native button so the drop zone is reachable and operable by keyboard */}
        <button
          type="button"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed py-6 transition-colors ${
            isDragging
              ? "border-accent bg-surface-muted"
              : "border-border hover:border-muted"
          }`}
        >
          <UploadCloudIcon className="h-6 w-6 text-muted" aria-hidden="true" />
          <samp className="font-mono text-[0.65rem] text-muted">
            DRAG & DROP OR CLICK TO UPLOAD
          </samp>
          <samp className="font-mono text-[0.6rem] text-muted opacity-60">
            PNG, JPG, WEBP — MAX 5MB
          </samp>
        </button>

        <input
          ref={fileRef}
          type="file"
          name={fieldName}
          accept="image/*"
          tabIndex={-1}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {/* Manual URL input */}
        <div className="flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
          <input
            type="text"
            name={urlFieldName}
            aria-label="Thumbnail image URL"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setPreview(e.target.value);
              if (fileRef.current) fileRef.current.value = ""; // clear file if URL typed
            }}
            placeholder="or paste image URL"
            className="flex-1 border border-border bg-background px-2 py-1.5 font-mono text-xs text-foreground outline-none placeholder:text-muted focus:border-muted"
          />
        </div>
      </div>
    </div>
  );
}
