import type { Metadata } from "next";

import { requireAdmin } from "@/lib/auth/session";
import { uploadCatalogsQuery } from "@/services/api/dashboard/catalogs.query";

import { UploadWorkspace } from "./_components/UploadWorkspace";

export const metadata: Metadata = {
  title: "Subir fotografías | Panel | Autobuses de Colombia",
};

export default async function UploadPage() {
  await requireAdmin();
  const catalogs = await uploadCatalogsQuery();

  return <UploadWorkspace catalogs={catalogs} />;
}
