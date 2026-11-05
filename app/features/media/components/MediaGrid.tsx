import { Form, useNavigation } from "react-router";
import { CopyIcon, ImageIcon, Trash2Icon } from "lucide-react";
import type { MediaFile } from "@/features/media/types";
import { formatBytes } from "@/utils/formatBytes";

const ACTION_BUTTON =
  "flex h-8 w-8 items-center justify-center bg-[var(--bg)] transition-colors hover:text-[var(--accent)] disabled:opacity-50";

interface MediaGridProps {
  files: MediaFile[];
}

export function MediaGrid({ files }: MediaGridProps) {
  const isBusy = useNavigation().state !== "idle";

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-[var(--line)] py-20">
        <ImageIcon className="h-8 w-8 text-[var(--muted)]" aria-hidden="true" />
        <samp className="font-mono text-xs text-[var(--muted)]">NO FILES UPLOADED YET</samp>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {files.map((file) => (
        <div key={file.fileId} className="group relative flex flex-col bg-[var(--bg)]">
          <div className="aspect-square overflow-hidden bg-[var(--surface-muted)]">
            <img src={file.url} alt={file.name} className="h-full w-full object-cover" loading="lazy" />
          </div>

          <div className="border-t border-[var(--line)] p-2">
            <p className="truncate font-mono text-[0.6rem] text-[var(--text)]">{file.name}</p>
            <samp className="font-mono text-[0.55rem] text-[var(--muted)]">{formatBytes(file.size)}</samp>
          </div>

          {/* Revealed on hover and on keyboard focus */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(file.url)}
              aria-label={`Copy URL of ${file.name}`}
              title="Copy URL"
              className={`${ACTION_BUTTON} text-[var(--text)]`}
            >
              <CopyIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <Form method="post" encType="multipart/form-data">
              <input type="hidden" name="intent" value="delete" />
              <input type="hidden" name="fileId" value={file.fileId} />
              <button
                type="submit"
                disabled={isBusy}
                onClick={(event) => {
                  if (!confirm("Delete this file permanently?")) event.preventDefault();
                }}
                aria-label={`Delete ${file.name}`}
                title="Delete"
                className={`${ACTION_BUTTON} text-[var(--muted)]`}
              >
                <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}
