import { create } from "zustand"
import { persist } from 'zustand/middleware'
import { TransportCategory } from "../../services/types/transportCategories.type"
import { transportCategoriesQuery } from '@/services/api/transportCategories.query'

const api = transportCategoriesQuery()

interface TransportCategoryStore {
    transportCategories: TransportCategory[];
    loading: boolean;
    error: string;
    setCategory: (data: TransportCategory[]) => void;
    fetchCategories: () => void;
    setLoading: (loading: boolean) => void;
}

export const useTransportCategoryStore = create<TransportCategoryStore>()(
  persist(
    (set) => ({
      transportCategories: [],
      loading: false,
      error: "",

      setCategory: (data: TransportCategory[]) => {
        set({ transportCategories: data })
      },

      fetchCategories: async () => {
        set({ loading: true, error: "" })
        try {
          const result = await api
          set({ transportCategories: result, loading: false })
        } catch (error) {
          set({ error: `Error to fetch data: ${error}`, loading: false })
        }
      },

      setLoading: (loading: boolean) => {
        set({ loading })
      }
    }),
    {
      name: 'transport-category-storage', // Clave para localStorage
      partialize: (state) => ({
        // Solo persistimos las categorías, no el estado loading ni errores
        transportCategories: state.transportCategories
      })
    }
  )
)
