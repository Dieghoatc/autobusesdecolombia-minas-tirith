import { useState, useEffect } from "react";
import { SliderItem } from "./SliderItem";

import "./slider.css";
import usePhotosStore from "@/lib/store/usePhotosStore";
import { LoaderIntro } from "../../../../../components/loader/LoaderIntro";
import usePostStore from "@/lib/store/usePostStore";

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
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (photosLoading || postLoading) return <LoaderIntro />;

  return (
    <section>
      <div className="slider-container">
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
