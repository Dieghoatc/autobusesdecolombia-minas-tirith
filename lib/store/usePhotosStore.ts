import { create } from "zustand";
import { Photo } from "../../services/types/photo.type";

interface PhotosStore {
  photos: Photo[];
  setPhotos: (newPhotos: Photo[]) => void;
}

const usePhotosStore = create<PhotosStore>((set) => ({
  photos: [] as Photo[],
  setPhotos: (newPhotos: Photo[]) => {
    set({ photos: newPhotos });
  },
}));

export default usePhotosStore;
