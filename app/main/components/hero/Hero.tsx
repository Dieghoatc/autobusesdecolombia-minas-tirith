"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "./Hero.module.css";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          markers: true,
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
          <div className={styles.item}>1</div>
          <div className={styles.item}>2</div>
          <div className={styles.item}>3</div>
          <div className={styles.item}>4</div>
          <div className={styles.item}>5</div>
          <div className={styles.item}>6</div>
          <div className={styles.item}>7</div>
          <div className={styles.item}>8</div>
          <div className={styles.item}>9</div>
        </div>
      </div>
    </section>
  );
}
