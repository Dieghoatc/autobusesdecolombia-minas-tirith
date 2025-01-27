import Card from "../main/components/Card/Card";
import {
  ApiResponse,
  autobusesApiAdapter,
} from "../../api/autobusesApi.adapter";
import { useHookFetch } from "@/app/hooks/useHookFetch";
import SkeletonComponent from "../skeleton/Skeleton";
import "./gallery.css";
import { orderHighestToLowest } from "@/app/utils";

export default function Gallery() {
  const { data, loading } = useHookFetch(autobusesApiAdapter);

  if (loading) {
    return <SkeletonComponent />;
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  const sortedData = orderHighestToLowest(data)

  return (
    <div className="cards-container">
      {sortedData.map((photo: ApiResponse) => (
        <div key={photo.photo_id}>
          <Card photo={photo} key={photo.photo_id} />
        </div>
      ))}
    </div>
  );
}
