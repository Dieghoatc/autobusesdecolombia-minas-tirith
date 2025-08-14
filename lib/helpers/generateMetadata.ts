import { Vehicle } from "@/services/types/vehicle.type";
import { Metadata } from "next";

interface Props {
  vehicle: Vehicle;
}

export async function generateMetadata({ vehicle }: Props): Promise<Metadata> {
  const vehicleImage = vehicle.vehiclePhotos[0].image_url;
  const vehicleModel = vehicle.model?.model_name || "";
  const companyName = vehicle.company?.company_name || "";

  return {
    title: `${vehicleModel} - ${companyName} | Autobuses de Colombia`,
    description: `Descubre este ${vehicleModel} de ${companyName}. Una exclusiva fotografía de nuestra colección de autobuses en Colombia.`,
    openGraph: {
      title: `${vehicleModel} - ${companyName}`,
      description: `Descubre este ${vehicleModel} de ${companyName}. Una exclusiva fotografía de nuestra colección de autobuses en Colombia.`,
      images: [
        {
          url: vehicleImage,
          width: 1200,
          height: 630,
          alt: `${vehicleModel} de ${companyName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicleModel} - ${companyName}`,
      description: `Descubre este ${vehicleModel} de ${companyName}. Una exclusiva fotografía de nuestra colección de autobuses en Colombia.`,
      images: [vehicleImage],
    },
  };
}
