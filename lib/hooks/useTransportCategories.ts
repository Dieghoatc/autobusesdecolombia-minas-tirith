import { useEffect } from "react";
import { useTransportCategoryStore } from "@/lib/store/useTransportCategoryStore";

export function useTransportCategories() {
  const { transportCategories, loading, error, fetchCategories } = useTransportCategoryStore()

  useEffect(() => {
    if(transportCategories.length === 0){
      fetchCategories()
    }

  }, [fetchCategories, transportCategories]);

  return {
    transportCategories,
    loading,
    error,
  };
}
