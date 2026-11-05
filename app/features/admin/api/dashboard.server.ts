import { COLLECTIONS } from "@/constants/collections";
import type { DashboardCounts } from "@/features/admin/types";
import { getDb } from "@/services/db.server";

export async function getDashboardCounts(): Promise<DashboardCounts> {
  const db = await getDb();
  const [blogCount, projectCount, reviewCount] = await Promise.all([
    db.collection(COLLECTIONS.blogs).countDocuments(),
    db.collection(COLLECTIONS.projects).countDocuments(),
    db.collection(COLLECTIONS.reviews).countDocuments(),
  ]);
  return { blogCount, projectCount, reviewCount };
}
