"use client";

import { Suspense } from "react";
import { useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";

import { searchQuery } from "@/services/api/search.query";

import { SearchLoading } from "./components/search-loading";
import { SearchResults } from "./components/search-result";

import styles from "./Search.module.css";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("busqueda");

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

  const searchPromise = searchQuery(deferredQuery);

  return (
    <div>
      <header className={styles.search_result_header}>
        <h1>Resultados de: <strong className={styles.search_query}>{deferredQuery}</strong></h1>
      </header>
      <main className={styles.searchContent}>
        <Suspense
          key={deferredQuery}
          fallback={<SearchLoading query={deferredQuery} />}
        >
          <SearchResults searchPromise={searchPromise} />
        </Suspense>
      </main>
    </div>
  );
}
