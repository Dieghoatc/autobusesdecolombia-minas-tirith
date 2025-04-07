import { useState, useEffect } from "react";
import { SliderItem } from "../components/SliderItem";

import "./slider.css";
import usePhotosStore from "@/app/store/usePhotosStore";
import { LoaderIntro } from "../../loader/LoaderIntro";
import usePostStore from "@/app/store/usePostStore";

export function Slider() {
  const [index, setIndex] = useState(0);
  const { photos, category, loading: photosLoading } = usePhotosStore();
  const { post, loading: postLoading } = usePostStore();

  let categoryTitle = "";
  if (category.category_id === 5) {
    categoryTitle = "Nuestros Recuerdos";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1)); // Si es 3, vuelve a 1
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (photosLoading || postLoading) return <LoaderIntro />;

  return (
    <section>
      <div className="slider-container">
        <SliderItem
          type="video"
          index={index}
          urlVideo="https://res.cloudinary.com/dkj6yzrrk/video/upload/v1744049626/autobusesdecolombiavideos/3940076-uhd_3840_2160_30fps_bvjlan.mp4"
          category="Destinos"
          title="Castillo de San Felipe"
          location="Cartagena de Indias - Colombia"
          author="Ricardo Perez"
        />
        <SliderItem
          type="photo"
          index={index}
          image={photos.url}
          title={`${photos.company}`}
          serial={photos.serial}
          bodywork={photos.bodywork}
          chassis={photos.chassis}
          location={photos.location}
          author={photos.author}
        />
        <SliderItem
          type="video"
          index={index}
          urlVideo="https://res.cloudinary.com/dkj6yzrrk/video/upload/v1744049641/autobusesdecolombiavideos/VID_20250406_113226_gbaxor.mp4"
          title="Transmilenio"
          location="Bogotá DC - Colombia"
          author="Dieghoatc"
        />
        <SliderItem
          type="post"
          index={index}
          image={post.image_url}
          title={post.title}
        />
        <SliderItem
          type="video"
          index={index}
          urlVideo="https://res.cloudinary.com/dkj6yzrrk/video/upload/v1742531105/autobusesdecolombiavideos/18092719-hd_1920_1080_30fps_1_vph33q.mp4"
          category="Destinos"
          title="El cerro de Monserrate"
          location="Bogotá DC - Colombia"
          author="Ricardo Perez"
        />
        <SliderItem
          type="photo"
          category={categoryTitle}
          index={index}
          image={category.url}
          title={`${category.company}`}
          serial={category.serial}
          bodywork={category.bodywork}
          chassis={category.chassis}
          location={category.location}
          author={category.author}
        />
      </div>
    </section>
  );
}
