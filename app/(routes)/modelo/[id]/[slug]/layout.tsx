import { vehicleModelQuery } from "@/services/api/vehicle-model.query";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const modelId = Number(resolvedParams.id);
    const modelData = await vehicleModelQuery(modelId);

    if (!modelData || !modelData.model) {
      return {
        title: "Modelo no encontrado | Autobuses de Colombia",
        description: "El modelo de autobús que buscas no está disponible.",
      };
    }

    const modelName = modelData.model.model_name || "";
    const brandName = modelData.model.brand?.name || "";
    const modelDescription = modelData.model.description || "";

    const title = `${modelName} - ${brandName} | Autobuses de Colombia`;
    const description = modelDescription 
      ? `${modelDescription}. Explora fotos, detalles y chasis de este modelo en Autobuses de Colombia.`
      : `Galería de fotografías y detalles técnicos del modelo de autobús ${modelName} de la marca ${brandName} en Autobuses de Colombia.`;

    const firstVehiclePhoto = modelData.model.vehicles?.[0]?.vehiclePhotos?.[0]?.image_url || "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: firstVehiclePhoto
          ? [
              {
                url: firstVehiclePhoto,
                width: 1200,
                height: 630,
                alt: `${modelName} de ${brandName}`,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: firstVehiclePhoto ? [firstVehiclePhoto] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for model:", error);
    return {
      title: "Modelo de Autobús | Autobuses de Colombia",
      description: "Explora galerías de fotos de autobuses en Colombia.",
    };
  }
}

export default function ModelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
