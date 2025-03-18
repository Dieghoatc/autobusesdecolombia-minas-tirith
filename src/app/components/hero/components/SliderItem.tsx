
import Image from "next/image";
import location from "@/assets/icons/location.png";
import camera from "@/assets/icons/camera.png";

import "./sliderItem.css";

interface SliderItemProps {
  index: number;
  image: string;
  title: string;
  bodywork?: string;
  chassis?: string;
  description?: string;
  location?: string;
  author?: string;
}

export function SliderItem(data: SliderItemProps) {
 

  return (
    <div className={`slider-image_container slide-translation-${data.index} `}>
      <img className="slide" src={data.image} alt={data.title} />
      <div className="slide-overlay">
        <h1>Autobuses de Colombia</h1>
        <h2>
          <b>{data.title}</b>
        </h2>
        <p>{data.bodywork}</p>
        <p>{data.chassis}</p>
        <div className="line"></div>
        <div className="slide-overlay-info">
          <Image src={location.src} alt="localizacion" width={15} height={15} />
          <p>{data.location}</p>
        </div>
        <div className="slide-overlay-info">
          <Image src={camera.src} alt="camara" width={15} height={15} />
          <p>{data.author}</p>
        </div>
      </div>
    </div>
  );
}
