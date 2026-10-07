import type { TransportCategory } from "@/services/types/transportCategories.type";

// The route accepts the numeric id (/transport-category/4, used by the sitemap
// and category lists) or the text slug (/transport-category/nuestros-recuerdos).
export function findCategory(
  categories: TransportCategory[],
  slug: string
): TransportCategory | undefined {
  return /^\d+$/.test(slug)
    ? categories.find((category) => category.transport_category_id === Number(slug))
    : categories.find((category) => category.slug === slug);
}
