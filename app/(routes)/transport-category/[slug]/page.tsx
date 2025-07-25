"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import { useGetVehicleCategoryById } from "@/lib/hooks";

import { GalleryList } from "@/components/galleryList";
import { PaginationGallery } from "@/components/paginationGallery/paginationGallery";

import { SkeletonGallery } from "../components/SkeletonGallery";
import { useTransportCategories } from "@/lib/hooks";

import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import styles from "./CategoryGallery.module.css";

export default function CategoryGallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { transportCategories, loading: loadingCategories } =
    useTransportCategories();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { vehicles, loading } = useGetVehicleCategoryById({
    id: Number(slug),
    page: page,
    limit: limit,
  });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading || loadingCategories) return <SkeletonGallery />;

  const category = transportCategories.find(
    (category) => category.transport_category_id === Number(slug)
  );
  const categoryTitle = category?.name.split(" ") || "";
  const categoryDescription = category?.description || "";

  function splitDescription(texto: string) {
    const palabras = texto.split(" ");
    const mitad = Math.floor(palabras.length / 3);

    // Buscar el espacio más cercano a la mitad para no cortar frases bruscamente
    let indiceDivision = mitad;

    // Ajustamos el índice hacia atrás hasta encontrar un punto o coma (opcional)
    for (let i = mitad; i > 0; i--) {
      if (palabras[i].endsWith(".")) {
        indiceDivision = i + 1;
        break;
      }
    }

    const parrafo1 = palabras.slice(0, indiceDivision).join(" ");
    const parrafo2 = palabras.slice(indiceDivision).join(" ");

    return [parrafo1, parrafo2];
  }
  const [p1, p2] = splitDescription(categoryDescription);
  const fullDescripcion = p1 + " " + p2;
  const shortDescripcion = p1;

  return (
    <div>
      <section className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {categoryTitle[0] + " "}
            <span>{categoryTitle[1]}</span>
          </h1>
          <div>
            <p className={styles.description}>
              {isExpanded ? fullDescripcion : shortDescripcion}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-amber-500 hover:text-amber-400 flex items-center mx-auto transition-colors"
            >
              {isExpanded ? (
                <>
                  Leer menos <ChevronUpIcon className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Leer más <ChevronDownIcon className="ml-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {vehicles.data.map((vehicle) => (
            <GalleryList key={vehicle.vehicle_id} vehicle={vehicle} />
          ))}
        </div>
        <div className={styles.pagination}>
          <PaginationGallery pagination={vehicles.info} goToPage={goToPage} />
        </div>
      </section>
    </div>
  );
}
