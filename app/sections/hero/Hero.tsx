import { vehicleCategoryQueryById } from "@/services/api/vehicleCategoryById";
import { vehicleQuery } from "@/services/api/vehicle.query";

import { CARDS_PER_SCENE, HERO_SCENES } from "./heroScenes";
import { HeroShowcase, type HeroScene } from "./HeroShowcase";
import { LogoStrip } from "./LogoStrip";

async function loadScene(config: (typeof HERO_SCENES)[number]): Promise<HeroScene> {
  try {
    const response = await vehicleCategoryQueryById(config.categoryId, 1, CARDS_PER_SCENE);
    const cards = (response?.data ?? [])
      .filter((vehicle) => vehicle.vehiclePhotos?.[0]?.image_url)
      .map((vehicle) => ({
        id: vehicle.vehiclePhotos[0].vehicle_photo_id,
        imageUrl: vehicle.vehiclePhotos[0].image_url,
        label: vehicle.company?.company_name || vehicle.model.model_name,
      }));
    return { ...config, cards };
  } catch {
    return { ...config, cards: [] };
  }
}

export async function Hero() {
  const [scenes, totals] = await Promise.all([
    Promise.all(HERO_SCENES.map(loadScene)),
    vehicleQuery(1, 1).catch(() => undefined),
  ]);
  const totalPhotos = totals?.info?.count ?? 0;
  // A category with no photos would leave an empty fan: skip it
  const visibleScenes = scenes.filter((scene) => scene.cards.length > 0);

  return (
    <>
      {visibleScenes.length > 0 && <HeroShowcase scenes={visibleScenes} totalPhotos={totalPhotos} />}
      <LogoStrip totalPhotos={totalPhotos} />
    </>
  );
}
