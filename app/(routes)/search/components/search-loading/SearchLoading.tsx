import styles from "./SearchLoading.module.css";

export function SearchLoading({ query }: { query: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.loading} />
      <p>Buscando &quot;{query}&quot;...</p>
    </div>
  );
}