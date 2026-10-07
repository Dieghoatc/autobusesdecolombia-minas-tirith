import { transportCategoriesQuery } from "@/services/api/transportCategories.query";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const categoryId = Number(resolvedParams.slug);
    const categories = await transportCategoriesQuery();
    const category = categories.find((c) => c.transport_category_id === categoryId);

    if (!category) {
      return {
        title: "Categoría no encontrada | Autobuses de Colombia",
        description: "La categoría de transporte que buscas no está disponible.",
      };
    }

    const categoryName = category.name || "";
    const categoryDescription = category.description || "";

    const title = `${categoryName} | Autobuses de Colombia`;
    const description = categoryDescription
      ? `${categoryDescription}. Mira las mejores fotos de esta categoría en nuestro portal.`
      : `Galería fotográfica y actualidad de autobuses en la categoría ${categoryName} en Colombia.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for transport category:", error);
    return {
      title: "Categoría de Transporte | Autobuses de Colombia",
      description: "Explora galerías de fotos de autobuses por categorías en Colombia.",
    };
  }
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
