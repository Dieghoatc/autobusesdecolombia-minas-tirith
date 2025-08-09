"use client";

import { useState } from "react";
import styles from "./ImagePage.module.css";

import image from "./lp4kvzoama608ocfxssn.webp";
import company from "@/assets/companies/cootranar.png";
import bodywork from "@/assets/vehicle/bodywork.png";
import chassis from "@/assets/vehicle/chassis.png";
import scania from "@/assets/brands/scania.png";
import jgb from "@/assets/brands/jgb.png";
import { Camera, Car, Eye, EyeOff, MapPin } from "lucide-react";

export default function ImagePage() {
  const [isShow, setIsShow] = useState(true);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  return (
    <section className={styles.wrapper}>
      <article className={styles.container}>
        <div className={styles.image}>
          <img src={image.src} alt="image" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.companylogo}>
              <img
                src={company.src}
                alt="company"
                className={isShow ? "" : styles.hidden}
              />
            </div>
            <div className={styles.title}>
              <h1 className={isShow ? "" : styles.hidden}>
                Busscar Busstar DD Volvo B430R 6x2
              </h1>
            </div>
            <div className={styles.controlview} onClick={handleClick}>
              {isShow ? <Eye /> : <EyeOff />}
            </div>
          </div>

          {isShow && (
            <div className={styles.blocks}>
              <div className={styles.block}>
                <div className={styles.item_container}>
                  <div className={styles.assets}>
                    <div className={styles.logo}>
                      <Car />
                    </div>
                    <div className={styles.brand}>
                      <img src={scania.src} alt="engine" />
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div className={styles.model}>
                      <h2>Placa</h2>
                      <p>GMT 815</p>
                    </div>
                    <div>
                      <h2>Serial</h2>
                      <p>9050</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles.item_container}>
                  <div className={styles.assets}>
                    <div className={styles.logo}>
                      <img src={chassis.src} alt="engine" />
                    </div>
                    <div className={styles.brand}>
                      <img src={scania.src} alt="engine" />
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div>
                      <h2>Chassis</h2>
                      <p>Volvo B430R 6x2</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles.item_container}>
                  <div className={styles.assets}>
                    <div className={styles.logo}>
                      <img src={bodywork.src} alt="engine" />
                    </div>
                    <div className={styles.brand}>
                      <img src={jgb.src} alt="engine" />
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div>
                      <h2>Carroceria</h2>
                      <p>JGB Dynamic</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles.item_container}>
                  <div className={styles.assets}>
                    <div className={styles.logo}>
                      <Camera />
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div>
                      <h2>Fotografo/a</h2>
                      <p>Julian Esteban Aguirre Arias</p>
                      <div className={styles.photolocation}>
                        <MapPin />
                        <p>San Pedro de Macorís</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
