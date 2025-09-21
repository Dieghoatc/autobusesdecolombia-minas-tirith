"use client";

import { Suspense, useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";

import { useSearch } from "@/lib/hooks/useSearch";
import { SearchResults } from "./components/search-result";
import { ABCLoader } from "@/app/components/abc-loader";

import styles from "./Search.module.css";

// Este componente se encarga de la lógica de búsqueda
function SearchContent() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("busqueda");

  const deferredQuery = useDeferredValue(rawQuery || "");

  const { results, setCurrentPage, hasNext } = useSearch({
    query: deferredQuery,
  });

  if (!deferredQuery) {
    return (
      <div className={styles.search_page_container}>
        <div className={styles.search_page_head}>
          <h1>Búsqueda</h1>
          <p>Introduce un término de búsqueda para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className={styles.search_result_header}>
        <h1>
          Resultados de:{" "}
          <strong className={styles.search_query}>{deferredQuery}</strong>
        </h1>
      </header>
      <main className={styles.searchContent}>
        <SearchResults
          results={results}
          setCurrentPage={setCurrentPage}
          hasNext={hasNext}
        />
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<ABCLoader />}>
      <SearchContent />
    </Suspense>
  );
}
