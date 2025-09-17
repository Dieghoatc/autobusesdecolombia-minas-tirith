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
  const rawQuery = searchParams.get('busqueda');

  const deferredQuery = useDeferredValue(rawQuery);

  if (!deferredQuery) {
    return (
      <div className={styles.searchPage}>
        <div className={styles.searchEmpty}>
          <h1>Búsqueda</h1>
          <p>Introduce un término de búsqueda para comenzar</p>
        </div>
      </div>
    );
  }

  const searchPromise = searchQuery(deferredQuery);

  return (
    <div>
      <header className={styles.searchHeader}>
        <h1>Resultados de búsqueda: </h1>
        <p className={styles.searchTerm}>
          Buscando: <strong>{deferredQuery}</strong>
        </p>
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
