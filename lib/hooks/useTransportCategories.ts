import { useEffect, useState } from "react";
import { TransportCategory } from "@/services/types/transportCategories.type";
import { transportCategoriesQuery } from "@/services/api/transportCategories.query";
import { useTransportCategoryStore } from "@/lib/store/useTransportCategoryStore";

export function useTransportCategories() {
  const [categoriesList, setCategoriesList] = useState<TransportCategory[]>([]);
  const setCategory = useTransportCategoryStore((state) => state.setCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError("");

      try {
        const result = await transportCategoriesQuery();
        setCategoriesList(result);
        setCategory(result);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    list: categoriesList,
    loading,
    error,
  };
}
