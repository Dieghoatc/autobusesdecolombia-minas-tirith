import { Card } from "../imageCard/ImageCard"
import { ApiPhotosResponse } from "@/services/types/photo.type"

interface LastPhotosProps {
    filteredData: ApiPhotosResponse[];
}

export function LastPhotos({ filteredData }: LastPhotosProps) {
    return (
        <section>
            <h3>Últimas fotografías</h3>
            {filteredData.map((photo) => (
                <Card key={photo.photo_id} photo={photo} />
            ))}
        </section>
    )
}