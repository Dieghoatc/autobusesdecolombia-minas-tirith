import { use } from "react";
import type { Model } from "@/services/types/model.type";

import styles from "./SearchResult.module.css";

export function SearchResults({
  searchPromise,
}: {
  searchPromise: Promise<Model[]>;
}) {
  const results = use(searchPromise);

  if (results.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>No se encontraron resultados</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Resultados para:</h1>
    </div>
  );
}
