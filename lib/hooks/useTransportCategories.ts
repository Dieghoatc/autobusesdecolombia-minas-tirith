import { useEffect } from "react";
import { useTransportCategoryStore } from "@/lib/store/useTransportCategoryStore";

// The list saved in the browser is shown right away, but it is refreshed from the
// API once per page load, so new or edited categories always appear. `loading`
// stays true until that refresh finishes, so a category missing from an old saved
// list is never reported as "not found".
export function useTransportCategories() {
  const { transportCategories, loading, error, refreshed, fetchCategories } =
    useTransportCategoryStore()

  useEffect(() => {
    if (!refreshed) {
      fetchCategories()
    }
  }, [fetchCategories, refreshed]);

  return {
    transportCategories,
    loading: loading || !refreshed,
    error,
  };
}
