import { create } from "zustand"    
import { ApiPhotosResponse } from "../api/dto/photo.dto"

interface PhotosStore {
    photos: ApiPhotosResponse;
    setPhotos: (newPhotos: ApiPhotosResponse) => void;
    category: ApiPhotosResponse;
    setCategory: (newPhotos: ApiPhotosResponse) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const usePhotosStore = create<PhotosStore>((set) => ({
    photos: {} as ApiPhotosResponse,
    setPhotos: (newPhotos: ApiPhotosResponse) => {
        set({ photos: newPhotos })
    },
    category: {} as ApiPhotosResponse,
    setCategory: (newCategoryPhotos: ApiPhotosResponse) => {
        set({ category: newCategoryPhotos })
    },
    loading: true,
    setLoading: (loading: boolean) => {
        set({ loading })
    }
}))

export default usePhotosStore