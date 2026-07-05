"use client";

import { useEffect, useRef, useState } from "react";
import { Model } from "@/services/types/search.type";
import { searchQuery } from "@/services/api/search.query";

interface UseSearchProps {
  query: string;
}

export function useSearch({ query }: UseSearchProps) {
  const [results, setResults] = useState<Model[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset pagination/results whenever the search term changes.
  useEffect(() => {
    setResults([]);
    setCurrentPage(1);
    setHasNext(true);
    setError(null);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function fetchResults() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: query,
          page: currentPage.toString(),
          limit: "9",
        });

        const result = await searchQuery(params, controller.signal);
        const data = result?.data ?? [];
        const info = result?.info;

        setResults((prev) => (currentPage === 1 ? data : [...prev, ...data]));
        setHasNext(!!info?.hasNext);
      } catch (err) {
        // Ignore aborted requests caused by a newer query/page superseding this one.
        if (err instanceof DOMException && err.name === "AbortError") return;

        setError(`Error al buscar "${query}". Intenta de nuevo.`);
        setHasNext(false);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchResults();

    return () => controller.abort();
  }, [query, currentPage]);

  return {
    results,
    error,
    isLoading,
    setCurrentPage,
    hasNext,
  };
}
