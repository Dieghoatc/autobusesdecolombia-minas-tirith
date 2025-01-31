import Card from "../main/components/Card/Card";
import { ApiPhotosResponse } from "@/app/api/autobusesApi.interfaces";
import { useHookFetch } from "@/app/hooks/useHookFetch";

import SkeletonComponent from "../skeleton/Skeleton";

import "./gallery.css";
import { orderById } from "@/app/utils/orderById";

export default function Gallery() {
  const { data, loading } = useHookFetch<ApiPhotosResponse[]>("photos");

  if (loading) {
    return <SkeletonComponent />;
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  function orderHighestToLowestPhotos(data: ApiPhotosResponse[]) {
    return orderById(data, "photo_id");
  }

  const sortedData = orderHighestToLowestPhotos(data as ApiPhotosResponse[]);

  return (
    <div className="cards-container">
      {sortedData.map((photo: ApiPhotosResponse) => (
        <div key={photo.photo_id}>
          <Card photo={photo} key={photo.photo_id} />
        </div>
      ))}
    </div>
  );
}
