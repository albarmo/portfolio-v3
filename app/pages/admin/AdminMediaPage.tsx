import { redirect } from "react-router";
import { parseFormData } from "@remix-run/form-data-parser";
import { AdminPageHeader } from "@/components/molecules/AdminPageHeader";
import { ErrorBanner } from "@/components/molecules/ErrorBanner";
import { AdminPageLayout } from "@/components/templates/AdminPageLayout";
import { MAX_UPLOAD_BYTES, MEDIA_FOLDER } from "@/constants/upload";
import { MediaGrid, MediaUploadButton } from "@/features/media/components";
import { getMediaLibrary, handleMediaAction } from "@/features/media/api/media.server";
import type { Route } from "./+types/AdminMediaPage";

export async function loader() {
  return getMediaLibrary();
}

export async function action({ request }: Route.ActionArgs) {
  await handleMediaAction(await parseFormData(request, { maxFileSize: MAX_UPLOAD_BYTES }));
  return redirect("/admin/media");
}

export default function AdminMediaPage({ loaderData }: Route.ComponentProps) {
  const { files, error } = loaderData;
  return (
    <AdminPageLayout>
      <AdminPageHeader
        breadcrumb="CMS / MEDIA LIBRARY"
        title="MEDIA"
        subtitle={`${files.length} FILE${files.length === 1 ? "" : "S"} IN ${MEDIA_FOLDER}`}
      >
        <MediaUploadButton />
      </AdminPageHeader>
      {error ? <ErrorBanner message={error} /> : null}
      <MediaGrid files={files} />
    </AdminPageLayout>
  );
}
