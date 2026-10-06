import "server-only";

import type { UploadCatalogs } from "@/services/types/dashboard.type";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchList<T>(path: string): Promise<T[]> {
  if (!API_URL) return [];
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? (data as T[]) : [];
  } catch (error) {
    console.error(`Failed to fetch ${path}: ${error}`);
    return [];
  }
}

// Loaded in parallel on the server so the upload form renders with its options.
export async function uploadCatalogsQuery(): Promise<UploadCatalogs> {
  const [
    photographers,
    vehicleTypes,
    vehicleModels,
    companies,
    companyServices,
    transportCategories,
  ] = await Promise.all([
    fetchList<UploadCatalogs["photographers"][number]>("/photographer"),
    fetchList<UploadCatalogs["vehicleTypes"][number]>("/vehicle-type"),
    fetchList<UploadCatalogs["vehicleModels"][number]>("/vehicle-model"),
    fetchList<UploadCatalogs["companies"][number]>("/company"),
    fetchList<UploadCatalogs["companyServices"][number]>("/company/service"),
    fetchList<UploadCatalogs["transportCategories"][number]>(
      "/transport-categories"
    ),
  ]);

  return {
    photographers,
    vehicleTypes,
    vehicleModels,
    companies,
    companyServices,
    transportCategories,
  };
}
