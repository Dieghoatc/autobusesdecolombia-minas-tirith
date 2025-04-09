import Image from "next/image";
import location from "../../../../assets/icons/location.png";
import camera from "../../../../assets/icons/camera.png";

import "./sliderItem.css";
import { formatString } from "@/app/utils";

interface SliderItemProps {
  index: number;
  category?: string;
  type: "photo" | "post" | "video";
  image?: string;
  urlVideo?: string;
  title: string;
  serial?: string;
  bodywork?: string;
  chassis?: string;
  location?: string;
  author?: string;
}

export function SliderItem(data: SliderItemProps) {

  

  return (
    <div className={`slider-image_container slide-translation-${data.index} `}>
      {data.type === "video" ? (
        <video
          className="slide"
          src={data.urlVideo}
          autoPlay
          loop
          muted
        ></video>
      ) : (
        <img
          className="slide"
          src={data.image}
          alt={`${data.title} - ${data.serial}`}
        />
      )}
      <div className="slide-overlay">
        <div>
          <h1>{data.category}</h1>
          <h2>
            {data && data.type === "photo" ? (
              <>
                <b>{formatString(data.title)}</b>
                <p>{data.serial}</p>
              </>
            ) : (
              <b>{data.title}</b>
            )}
          </h2>
          {!data.bodywork || data.bodywork === "n/a" ? null : (
            <p>{formatString(data.bodywork)}</p>
          )}

          {!data.chassis || data.chassis === "n/a" ? null : <p>{formatString(data.chassis)}</p>}
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
                <p>{formatString(data.location)}</p>
              </>
            )}
          </div>
          <div className="slide-overlay-info">
            {!data.author ? null : (
              <>
                <Image src={camera.src} alt="camara" width={15} height={15} />
                <p>{formatString(data.author)}</p>
              </>
            )}
          </div>
          <></>
        </div>
      </div>
    </div>
  );
}
