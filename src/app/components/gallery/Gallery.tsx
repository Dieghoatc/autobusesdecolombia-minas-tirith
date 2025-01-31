import Card from "../main/components/Card/Card";
import { ApiPhotosResponse } from "@/app/api/autobusesApi.interfaces";
import { useHookFetch } from "@/app/hooks/useHookFetch";
import { orderHighestToLowest } from "@/app/utils";

import SkeletonComponent from "../skeleton/Skeleton";

import "./gallery.css";

export default function Gallery() {
  const { data, loading } = useHookFetch("photos");

  if (loading) {
    return <SkeletonComponent />;
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  const sortedData = orderHighestToLowest(data as ApiPhotosResponse[]);

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
