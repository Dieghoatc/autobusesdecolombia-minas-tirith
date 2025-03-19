import Image from "next/image";
import location from "@/assets/icons/location.png";
import camera from "@/assets/icons/camera.png";

import "./sliderItem.css";
import { capitalizeFirstLetter } from "@/app/utils";

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
          <b>{capitalizeFirstLetter(data.title)}</b>
        </h2>
        {!data.bodywork ? null : <p>{capitalizeFirstLetter(data.bodywork)}</p>}

        {!data.chassis ? null : <p>{capitalizeFirstLetter(data.chassis)}</p>}
        <div className="line"></div>
        <div className="slide-overlay-info">
          {!data.location ? null : (
            <>
              <Image
                src={location.src}
                alt="localizacion"
                width={15}
                height={15}
              />
              <p>{capitalizeFirstLetter(data.location)}</p>
            </>
          )}
        </div>
        <div className="slide-overlay-info">
        {!data.author ? null : (
            <>
              <Image src={camera.src} alt="camara" width={15} height={15} />
              <p>{capitalizeFirstLetter(data.author)}</p>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
}
