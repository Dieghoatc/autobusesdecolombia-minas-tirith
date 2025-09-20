"use client";

import { Suspense } from "react";
import { useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";

import { searchQuery } from "@/services/api/search.query";

import { SearchResults } from "./components/search-result";
import { ABCLoader } from "@/app/components/abc-loader";

import styles from "./Search.module.css";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("busqueda");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const deferredQuery = useDeferredValue(rawQuery);

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

  const searchPromise = searchQuery(deferredQuery, Number(page), Number(limit));

  return (
    <div>
      <header className={styles.search_result_header}>
        <h1>Resultados de: <strong className={styles.search_query}>{deferredQuery}</strong></h1>
      </header>
      <main className={styles.searchContent}>
        <Suspense
          key={deferredQuery}
          fallback={ <ABCLoader />}
        >
          <SearchResults searchPromise={searchPromise} />
        </Suspense>
      </main>
    </div>
  );
}
