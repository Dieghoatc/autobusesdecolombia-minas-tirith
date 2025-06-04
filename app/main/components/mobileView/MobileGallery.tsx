import { LastPhotos } from "../gallery/components/lastPhotos";
import { CategoryList } from "../gallery/components/categoryList";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { AdHorizontal } from "@/components/adsense/AdHorizontal";

interface MobileGalleryProps {
  images: ApiPhotosResponse[];
}

export function MobileGallery({ images }: MobileGalleryProps) {
  return (
    <div>
      <LastPhotos photos={images} />
      <CategoryList category="interdepartamental" />
      <CategoryList category="intermunicipal" />
      <AdHorizontal />
      <CategoryList category="nuestros_recuerdos" />
      <CategoryList category="especial" />
      <CategoryList category="urbanos" />
      <CategoryList category="internacionales" />
    </div>
  );
}
