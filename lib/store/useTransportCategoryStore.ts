import { create } from "zustand"
import { TransportCategory } from "../../services/types/transportCategories.type"
import { transportCategoriesQuery } from '@/services/api/transportCategories.query';


const api = transportCategoriesQuery();

interface TransportCategoryStore {
    transportCategories: TransportCategory[];
    loading: boolean;
    error: string;
    setCategory: (data: TransportCategory[]) => void;
    fetchCategories: () => void;
}

export const useTransportCategoryStore = create<TransportCategoryStore>((set) => ({
    transportCategories: [] as TransportCategory[],
    loading: false,
    error: "",

    setCategory: (data: TransportCategory[]) => {
        set({ transportCategories: data })
    },
    fetchCategories: async () => {
        set({ loading: true , error: ""});
        try {
            const result = await api;
            set({ transportCategories: result, loading: false })
        } catch (error) {
            set({ error: `Error to fetch data: ${error}` })
        } finally {
            set({ loading: false })
        }
    },
    setLoading: (loading: boolean) => {
        set({ loading: loading })
    }
}))