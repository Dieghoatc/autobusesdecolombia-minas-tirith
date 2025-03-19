import Card from "../main/components/Card/Card";
import { ApiPhotosResponse } from "@/app/api/dto/photo.dto";
import { useGetPhotos } from "@/app/hooks/useGetPhotos";

import SkeletonComponent from "../skeleton/Skeleton";

import "./gallery.css";
import { orderById } from "@/app/utils/orderById";

export default function Gallery() {
  const { photos, loading } = useGetPhotos();

  if (loading) return <SkeletonComponent />;
  
  function orderHighestToLowestPhotos(data: ApiPhotosResponse[]) {
    return orderById(data, "photo_id");
  }

  const sortedData = orderHighestToLowestPhotos(photos);

  return (
    <div className="cards-container">
      {sortedData.map((photo) => (
        <div key={photo.photo_id}>
          <Card photo={photo} key={photo.photo_id} />
        </div>
      ))}
    </div>
  );
}
