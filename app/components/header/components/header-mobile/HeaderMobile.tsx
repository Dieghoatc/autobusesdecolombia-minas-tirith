"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon, Menu, X, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import styles from "./HeaderMobile.module.css";
import logo from "@/assets/logo-mobile.png";
import { Search } from "./components/search";

export function HeaderMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav className={styles.container}>
      <AnimatePresence mode="wait">
        {openSearch ? (
          <Search searchClose={setOpenSearch} />
        ) : (
          <>
            <div className={styles.menu_left}>
              {openMenu ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setOpenMenu(false)}
                >
                  <X className={styles.xmenu} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setOpenMenu(true)}
                >
                  <Menu className={styles.listMenu} />
                </motion.div>
              )}
              <div className={styles.logo}>
                <Link href="/" title="Home">
                  <Image
                    src={logo}
                    alt="Logo Autobuses de Colombia"
                    title="Logo Autobuses de Colombia"
                  />
                </Link>
              </div>
            </div>
            <div className={styles.menu_right}>
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpenSearch(true)}
              >
                <SearchIcon />
              </motion.div>
              <div className={styles.homepage}>
                <Link href="/" title="Home">
                  <HomeIcon />
                </Link>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
