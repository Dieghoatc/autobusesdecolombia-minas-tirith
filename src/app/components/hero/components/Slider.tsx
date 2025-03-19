import { useState, useEffect } from "react";
import { SliderItem } from "../components/SliderItem";

import "./slider.css";
import usePhotosStore from "@/app/store/usePhotosStore";
import { LoaderIntro } from "../../loader/LoaderIntro";

export function Slider() {
  const [index, setIndex] = useState(0);
  const { photos, loading} = usePhotosStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1)); // Si es 3, vuelve a 1
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoaderIntro />;

  return (
     <section>
       <div className="slider-container">
         <SliderItem
           index={index}
           image={photos.url}  
           title={`${photos.company} - ${photos.serial}`}
           bodywork={photos.bodywork}
           chassis={photos.chassis}
           location={photos.location}
           author={photos.author}
         />
         <SliderItem
           index={index}
           image="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1741570245/autobusesdecolombia/po8crqhjr4di5wllwmka.webp"
           title="Coomotor 8560"
           bodywork="Marcopolo paradiso 1350 g7"
           chassis="Scania k 410 Opticruise"
           location="Bogotá DC - Colombia"
           author="Andrés Hernández"
         />
         <SliderItem
           index={index}
           image="https://www.sustainable-bus.com/wp-content/uploads/2025/03/MAN-e-bus-autobus-elettrici-SETA.jpg"
           title="Primeros autobuses eléctricos. en Italia"
           location="Italia"
           author="Busworld"
         />
       </div>
     </section>
  );
}
