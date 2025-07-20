import { create } from "zustand"
import { TransportCategory } from "../../services/types/transportCategories.type"

interface TransportCategoryStore {
    category: TransportCategory[];
    setCategory: (newCategoryPhotos: TransportCategory[]) => void;
}

export const useTransportCategoryStore = create<TransportCategoryStore>((set) => ({
    category: {} as TransportCategory[],
    setCategory: (newCategoryPhotos: TransportCategory[]) => {
        set({ category: newCategoryPhotos })
    }
}))