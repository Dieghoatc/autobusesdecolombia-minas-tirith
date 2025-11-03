"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import useShowSidebarMenu from "@/lib/store/useShowSidebarMenu";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "./components/search";

import { Menu, Search as SearchIcon } from "lucide-react";
import logo from "@/public/assets/logos/abc_logo_single.svg";

export function HeaderMobile() {
  const [openSearch, setOpenSearch] = useState(false);
  const {setOpen} = useShowSidebarMenu();

  return (
    <nav className="flex items-center justify-between">
      <AnimatePresence mode="wait">
        {openSearch ? (
          <Search searchClose={setOpenSearch} view="mobile" />
        ) : (
          <>
            <div className="flex items-center">
              <Menu onClick={() => setOpen(true)} />
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
            </div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
