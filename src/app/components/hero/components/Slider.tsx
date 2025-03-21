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
    categoryTitle = "nuestros-recuerdos";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1)); // Si es 3, vuelve a 1
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
          image={category.url}
          category="Destinos"
          title="El cerro de Monserrate"
          location="Bogotá DC - Colombia"
          author="Ricardo Perez"
        />
        <SliderItem
          type="photo"
          index={index}
          image={photos.url}
          title={`${photos.company} - ${photos.serial}`}
          bodywork={photos.bodywork}
          chassis={photos.chassis}
          location={photos.location}
          author={photos.author}
        />
        <SliderItem
          type="post"
          index={index}
          image={post.image_url}
          title={post.title}
        />
        <SliderItem
          type="photo"
          category={categoryTitle}
          index={index}
          image={category.url}
          title={`${category.company} - ${category.serial}`}
          bodywork={category.bodywork}
          chassis={category.chassis}
          location={category.location}
          author={category.author}
        />
      </div>
    </section>
  );
}
