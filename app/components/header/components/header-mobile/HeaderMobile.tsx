"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon, Menu, X, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import logo from "@/assets/abc_logo_single.svg";
import { Search } from "../search";

export function HeaderMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav className="flex items-center justify-between">
      <AnimatePresence mode="wait">
        {openSearch ? (
          <Search searchClose={setOpenSearch} view="mobile" />
        ) : (
          <>
            <div className="flex items-center">
              {openMenu ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setOpenMenu(false)}
                >
                  <X />
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
                  <Menu />
                </motion.div>
              )}
              <div className="flex items-center w-1/2">
                <Link href="/" title="Home">
                  <Image
                    src={logo}
                    alt="Logo Autobuses de Colombia"
                    title="Logo Autobuses de Colombia"
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
              <div className="flex items-center">
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
