import Card from "../main/components/Card/Card";
import { ApiResponse } from "../../api/autobusesApi.adapter";

interface GalleryProps {
  data: ApiResponse[];
}

export default function Gallery({data}: GalleryProps) {
  return (
    <div className="cards-container">
      {data.map((photo: ApiResponse) => (
        <div key={photo.photo_id}>
          <Card photo={photo} key={photo.photo_id} />
        </div>
      ))}
    </div>
  );
}
