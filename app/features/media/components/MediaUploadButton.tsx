import { Form } from "react-router";
import { UploadCloudIcon } from "lucide-react";

export function MediaUploadButton() {
  return (
    <Form method="post" encType="multipart/form-data" className="flex items-center gap-2">
      <input type="hidden" name="intent" value="upload" />
      <label className="flex cursor-pointer items-center gap-2 border border-border bg-surface px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-muted transition-colors focus-within:border-accent focus-within:text-accent hover:border-accent hover:text-accent">
        <UploadCloudIcon className="h-3.5 w-3.5" aria-hidden="true" />
        CHOOSE FILE
        {/* sr-only (not display:none) keeps the input reachable by keyboard */}
        <input
          type="file"
          name="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            if (event.target.files?.[0]) event.target.form?.requestSubmit();
          }}
        />
      </label>
    </Form>
  );
}
