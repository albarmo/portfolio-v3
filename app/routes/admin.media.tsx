import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { CopyIcon, ImageIcon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import { deleteFile, listFiles, uploadToImageKit } from "~/lib/imagekit.server";
import { requireAdmin } from "~/lib/session.server";

type IKFile = {
  fileId: string;
  name: string;
  url: string;
  size: number;
  fileType: string;
  createdAt: string;
  thumbnail?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  try {
    const files = (await listFiles("/portfolio")) as IKFile[];
    return json({ files, error: null });
  } catch {
    return json({
      files: [] as IKFile[],
      error: "Failed to load files from ImageKit.",
    });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdmin(request);

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 5_000_000,
  });
  const form = await unstable_parseMultipartFormData(request, uploadHandler);
  const intent = form.get("intent") as string;

  if (intent === "delete") {
    const fileId = form.get("fileId") as string;
    await deleteFile(fileId);
    return redirect("/admin/media");
  }

  if (intent === "upload") {
    const file = form.get("file") as File | null;
    if (file && file.size > 0) {
      await uploadToImageKit(file, "/portfolio");
    }
    return redirect("/admin/media");
  }

  return redirect("/admin/media");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function AdminMedia() {
  const { files, error } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isWorking = navigation.state !== "idle";

  return (
    <div className="p-20">
      <div className="mb-8 flex items-start justify-between border-b border-[var(--line)] pb-6">
        <div>
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            CMS / MEDIA LIBRARY
          </samp>
          <h1 className="mt-1 font-display text-3xl font-black uppercase text-[var(--text)]">
            MEDIA
          </h1>
          <samp className="mt-1 block font-mono text-[0.6rem] text-[var(--muted)]">
            {files.length} FILE{files.length !== 1 ? "S" : ""} IN /portfolio
          </samp>
        </div>

        {/* Upload form */}
        <Form
          method="post"
          encType="multipart/form-data"
          className="flex items-center gap-2"
        >
          <input type="hidden" name="intent" value="upload" />
          <label className="flex cursor-pointer items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <UploadCloudIcon className="h-3.5 w-3.5" />
            CHOOSE FILE
            <input
              type="file"
              name="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  e.target.form?.requestSubmit();
                }
              }}
            />
          </label>
        </Form>
      </div>

      {error && (
        <div className="mb-6 border border-[var(--accent)] bg-[var(--accent)] px-4 py-3">
          <samp className="font-mono text-xs font-bold text-white">
            ⚠ {error}
          </samp>
        </div>
      )}

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-[var(--line)] py-20">
          <ImageIcon className="h-8 w-8 text-[var(--muted)]" />
          <samp className="font-mono text-xs text-[var(--muted)]">
            NO FILES UPLOADED YET
          </samp>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {files.map((file) => (
            <div
              key={file.fileId}
              className="group relative flex flex-col bg-[var(--bg)]"
            >
              {/* Thumbnail */}
              <div className="aspect-square overflow-hidden bg-[var(--surface-muted)]">
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Meta */}
              <div className="border-t border-[var(--line)] p-2">
                <p className="truncate font-mono text-[0.6rem] text-[var(--text)]">
                  {file.name}
                </p>
                <samp className="font-mono text-[0.55rem] text-[var(--muted)]">
                  {formatBytes(file.size)}
                </samp>
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(file.url);
                  }}
                  title="Copy URL"
                  className="flex h-8 w-8 items-center justify-center bg-[var(--bg)] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                </button>
                <Form method="post" encType="multipart/form-data">
                  <input type="hidden" name="intent" value="delete" />
                  <input type="hidden" name="fileId" value={file.fileId} />
                  <button
                    type="submit"
                    disabled={isWorking}
                    onClick={(e) => {
                      if (!confirm("Delete this file permanently?"))
                        e.preventDefault();
                    }}
                    title="Delete"
                    className="flex h-8 w-8 items-center justify-center bg-[var(--bg)] text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
