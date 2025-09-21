"use client";

import { useEffect, useState } from "react";
import { Model } from "@/services/types/search.type";
import { searchQuery } from "@/services/api/search.query";

interface UseSearchProps {
  query: string;
}

export function useSearch({ query  }: UseSearchProps) {
  const [results, setResults] = useState<Model[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState(true);
  
  useEffect(() => {
    async function fetchResults(query: string, page: number, limit: number) {
      const result = await searchQuery(query, page, limit);
      setResults(prev => [...prev, ...result.data]);
      setCurrentPage(result.info.currentPage);
      setHasNext(result.info.hasNext)
    }

    fetchResults(query, currentPage, 9);
  }, [query, currentPage]);

  return {
    results,
    setCurrentPage,
    hasNext,
  };
}
