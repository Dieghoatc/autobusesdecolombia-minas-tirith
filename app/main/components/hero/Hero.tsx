"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Slider } from "./components/slider/Slider";

import styles from "./Hero.module.css";

import chasis from "@/assets/hero/chassis.webp";
import destinations from "@/assets/hero/destinations.webp";
import bodywork from "@/assets/hero/bodywork.webp";
import companies from "@/assets/hero/companies.webp";
import routes from "@/assets/hero/routes.webp";
import terminal from "@/assets/hero/terminal.webp";
import news from "@/assets/hero/news.webp";
import community from "@/assets/hero/community.jpg";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });

      tl.to(heroRef.current, {
        scale: 1,
        duration: 1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.content_wrapper}>
        <div className={styles.hero_images} ref={heroRef}>
          <div className={styles.item}>
            <picture>
              <img
                src={chasis.src}
                alt="Fotografia chasis"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={destinations.src}
                alt="Fotografia destinos"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={bodywork.src}
                alt="Fotografia carroceria de buses"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={companies.src}
                alt="Fotografia compañias de transporte"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <Slider />
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={community.src}
                alt="Fotografia comunidad de transporte"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={news.src}
                alt="Fotografia noticias de transporte"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={terminal.src}
                alt="Fotografia terminal de transporte colombia"
                className={styles.image}
              />
            </picture>
          </div>
          <div className={styles.item}>
            <picture>
              <img
                src={routes.src}
                alt="Fotografia rutas de colombia"
                className={styles.image}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
