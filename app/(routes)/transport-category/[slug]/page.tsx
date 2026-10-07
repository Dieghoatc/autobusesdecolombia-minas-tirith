import Link from "next/link";
import { notFound } from "next/navigation";

import { InfiniteGallery } from "@/app/sections/gallery/components/InfiniteGallery";
import { transportCategoriesQuery } from "@/services/api/transportCategories.query";
import { vehicleCategoryQueryById } from "@/services/api/vehicleCategoryById";

import { CategoryDescription } from "./CategoryDescription";
import { findCategory } from "./findCategory";

// Same refresh window as the gallery and /api/gallery
export const revalidate = 60;

const PAGE_LIMIT = 20;
const numberFormat = new Intl.NumberFormat("es-CO");

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Server-rendered first page (indexable), then infinite scroll through
// /api/gallery?category=… with the same scroll restore as /galeria.
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await transportCategoriesQuery().catch((error) => {
    console.error(error);
    return null;
  });
  // API down: a friendly message, not a 404 (the category may well exist)
  if (!categories) {
    return <EmptyState message="No pudimos cargar esta categoría. Intenta de nuevo en unos minutos." />;
  }

  const category = findCategory(categories, slug);
  if (!category) notFound();

  const initial = await vehicleCategoryQueryById(
    category.transport_category_id,
    1,
    PAGE_LIMIT
  ).catch((error) => {
    console.error(error);
    return null;
  });

  const [firstWord, ...rest] = category.name.split(" ");

  return (
    <div className="py-8">
      <header className="mx-auto mb-10 max-w-4xl space-y-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          Categoría
        </p>
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          {firstWord} <span className="text-amber-400">{rest.join(" ")}</span>
        </h1>
        {category.description && <CategoryDescription text={category.description} />}
        {initial && initial.info.count > 0 && (
          <p className="text-sm text-zinc-500">
            {numberFormat.format(initial.info.count)} vehículos fotografiados
          </p>
        )}
      </header>

      {initial?.data?.length ? (
        <InfiniteGallery
          initial={initial}
          limit={PAGE_LIMIT}
          category={category.transport_category_id}
        />
      ) : (
        <EmptyState
          message={
            initial
              ? "Todavía no hay fotos en esta categoría."
              : "No pudimos cargar las fotos. Intenta de nuevo en unos minutos."
          }
        />
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-zinc-400">{message}</p>
      <Link
        href="/galeria"
        className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
      >
        Explorar la galería
      </Link>
    </section>
  );
}
