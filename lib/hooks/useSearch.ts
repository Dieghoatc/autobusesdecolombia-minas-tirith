"use client";

import { useEffect, useState } from "react";
import { Model } from "@/services/types/search.type";
import { searchQuery } from "@/services/api/search.query";

interface UseSearchProps {
  query: string;
}

export function useSearch({ query }: UseSearchProps) {
  const [results, setResults] = useState<Model[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    setResults([]);
    setCurrentPage(1);
    setHasNext(true);
  }, [query]);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;

      const params = new URLSearchParams({
        q: query,
        page: currentPage.toString(),
        limit: "9",
      });

      const result = await searchQuery(params);

      if (currentPage === 1) {
        setResults(result.data);
      } else {
        setResults((prev) => [...prev, ...result.data]);
      }

      setHasNext(result.info.hasNext);
    }

    fetchResults();
  }, [query, currentPage]);

  return {
    results,
    setCurrentPage,
    hasNext,
  };
}
