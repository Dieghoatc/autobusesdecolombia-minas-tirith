"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { motion } from "motion/react";
import { SearchIcon, HomeIcon } from "lucide-react";

import { ListCheckIcon } from "lucide-react";
import ABCLogo from "@/assets/abc_logo.svg";
import styles from "./HeaderDesktop.module.css";

export function HeaderDesktop() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = event.currentTarget.search.value;
    router.push(`/search?busqueda=${data}`)
  }
  return (
    <nav className={styles.container}>
      <div className={styles.menu_left}>
        <div>
          <ListCheckIcon />
        </div>
        <div>
          <Image src={ABCLogo.src} alt="Logo" width={150} height={50} />
        </div>
      </div>
      <div className={styles.search}>
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
      <div className={styles.menu_right}>
        <Link href="/" title="Home">
          <HomeIcon />
        </Link>
      </div>
    </nav>
  );
}
