import { useRouter } from "next/navigation";

import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { motion } from "motion/react";
import styles from "./Search.module.css";

async function getSearch(search: string) {
  const res = await fetch(`http://localhost:3001/search/${search}`);
  const data = await res.json();
  return data;
}

interface SearchProps {
  searchClose: (value: boolean) => void;
}

export function Search({ searchClose }: SearchProps) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search");
    getSearch(search as string);
    router.push(`/search`);
    searchClose(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return (
    <div className={styles.container}>
      <ArrowLeft onClick={() => searchClose(false)} />
      <motion.form
        key="close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
      >
        <input type="text" onChange={(e) => handleChange(e)} name="search" />
        <button type="submit">
          <SearchIcon />
        </button>
      </motion.form>
    </div>
  );
}
