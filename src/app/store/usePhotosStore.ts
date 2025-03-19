import { create } from "zustand"    
import { ApiPhotosResponse } from "../api/dto/photo.dto"

interface PhotosStore {
    photos: ApiPhotosResponse;
    setPhotos: (newPhotos: ApiPhotosResponse) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const usePhotosStore = create<PhotosStore>((set) => ({
    photos: {} as ApiPhotosResponse,
    setPhotos: (newPhotos: ApiPhotosResponse) => {
        set({ photos: newPhotos })
    },
    loading: true,
    setLoading: (loading: boolean) => {
        set({ loading })
    }
}))

export default usePhotosStore