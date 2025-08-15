import { vehicleQueryById } from "@/services/api/vehicleById.query";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const vehicle = await vehicleQueryById(Number(params.id));

    if (!vehicle) {
      return {
        title: "Vehículo no encontrado | Autobuses de Colombia",
        description: "El vehículo que buscas no está disponible.",
      };
    }

    const vehicleImage = vehicle.vehiclePhotos?.[0]?.image_url || "";
    const vehicleModel = vehicle.model?.model_name || "";
    const companyName = vehicle.company?.company_name || "";
    const photographer = vehicle.vehiclePhotos?.[0]?.photographer?.name || "";

    const title = `${vehicleModel} - ${companyName} | Autobuses de Colombia`;
    const description = `Fotografía por ${photographer}. Descubre este ${vehicleModel} de ${companyName} en nuestra colección de autobuses en Colombia.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: vehicleImage
          ? [
              {
                url: vehicleImage,
                width: 1200,
                height: 630,
                alt: `${vehicleModel} de ${companyName}`,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: vehicleImage ? [vehicleImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error | Autobuses de Colombia",
      description:
        "Ha ocurrido un error al cargar la información del vehículo.",
    };
  }
}

export default function VehicleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
