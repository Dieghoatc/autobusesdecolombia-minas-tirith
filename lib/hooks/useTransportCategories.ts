import { useEffect } from "react";
import { useTransportCategoryStore } from "@/lib/store/useTransportCategoryStore";

export function useTransportCategories() {
  const { categories, loading, error, fetchCategories } = useTransportCategoryStore()

  useEffect(() => {
    if(categories.length === 0){
      fetchCategories()
    }

  }, [fetchCategories, categories]);

  return {
    categories,
    loading,
    error,
  };
}
