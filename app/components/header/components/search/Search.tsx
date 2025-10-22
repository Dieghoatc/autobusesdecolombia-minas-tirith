import { useRouter } from "next/navigation";

import { motion } from "motion/react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";

import styles from "./Search.module.css";

interface SearchProps {
  searchClose: (value: boolean) => void;
  view: "mobile" | "desktop";
}

export function Search({ searchClose, view   }: SearchProps) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = event.currentTarget.search.value;
    router.push(`/search?busqueda=${data}`);
    searchClose(false);
  }

  return (
    <div className={styles.container}>
      {view === "mobile" && (
        <ArrowLeft onClick={() => searchClose(false)} />
      )}
      <motion.form
        key="close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
      >
        <input type="text" name="search" />
        <button type="submit">
          <SearchIcon />
        </button>
      </motion.form>
    </div>
  );
}
