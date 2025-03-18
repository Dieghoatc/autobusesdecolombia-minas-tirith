import { useState, useEffect } from "react";
import Image from "next/image";
import "./hero.css";

import location from "@/assets/icons/location.png";
import camera from "@/assets/icons/camera.png";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //setIndex(prevIndex => (prevIndex === 2 ? 0 : prevIndex + 1)); // Si es 3, vuelve a 1
    }, 5000);

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="slider">
      <div className="slider-container">
        <div className={`slider-image_container slide-translation-${index} `}>
          <img
            className="slide"
            src="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1742279541/autobusesdecolombia/lvck6ml1zidmbryftdcf.webp"
            alt="noticias"
          />
          <div className="slide-overlay">
            <h1>Autobuses de Colombia</h1>
            <h2>
              <b>COOTRANSBOL LTDA 5021</b>
            </h2>
            <p>Marcopolo Paradiso 1200 G7</p>
            <p>Scania K400</p>
            <div className="line"></div>
            <div className="slide-overlay-info">
              <Image
                src={location.src}
                alt="localizacion"
                width={15}
                height={15}
              />
              <p>Pamplona - Colombia</p>
            </div>
            <div className="slide-overlay-info">
              <Image src={camera.src} alt="camara" width={15} height={15} />
              <p>Andrés Hernández</p>
            </div>
          </div>
        </div>
        <div className={`slider-image_container slide-translation-${index}`}>
          <img
            className="slide"
            src="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1741575359/autobusesdecolombia/dsyoivvx1dbud1mnsk1x.webp"
            alt="noticias"
          />
        </div>
        <div className={`slider-image_container slide-translation-${index}`}>
          <img
            className="slide"
            src="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1741574515/autobusesdecolombia/mjghhazxvqgnlrbkl8fa.webp"
            alt="noticias"
          />
        </div>
      </div>
    </div>
  );
}
