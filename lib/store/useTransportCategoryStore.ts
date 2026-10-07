import { create } from "zustand"
import { persist } from 'zustand/middleware'
import { TransportCategory } from "../../services/types/transportCategories.type"
import { transportCategoriesQuery } from '@/services/api/transportCategories.query'

interface TransportCategoryStore {
    transportCategories: TransportCategory[];
    loading: boolean;
    error: string;
    // True once the list has been refreshed from the API in this page load
    refreshed: boolean;
    setCategory: (data: TransportCategory[]) => void;
    fetchCategories: () => Promise<void>;
    setLoading: (loading: boolean) => void;
}

// Shared by concurrent callers so the API is only requested once at a time
let inFlight: Promise<void> | null = null;

export const useTransportCategoryStore = create<TransportCategoryStore>()(
  persist(
    (set) => ({
      transportCategories: [],
      loading: false,
      error: "",
      refreshed: false,

      setCategory: (data: TransportCategory[]) => {
        set({ transportCategories: data })
      },

      fetchCategories: () => {
        if (inFlight) return inFlight
        set({ loading: true, error: "" })
        inFlight = transportCategoriesQuery()
          .then((result) => {
            set({ transportCategories: result, loading: false, refreshed: true })
          })
          .catch((error) => {
            // Keep the saved list (if any) so the site still works offline
            set({ error: `Error to fetch data: ${error}`, loading: false, refreshed: true })
          })
          .finally(() => {
            inFlight = null
          })
        return inFlight
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
      }),
      // Older versions could save a non-list (e.g. {} after an API error), which
      // broke the category pages until the browser data was cleared
      merge: (persisted, current) => {
        const saved = (persisted as Partial<TransportCategoryStore> | undefined)?.transportCategories
        return {
          ...current,
          transportCategories: Array.isArray(saved) ? saved : [],
        }
      },
    }
  )
)
