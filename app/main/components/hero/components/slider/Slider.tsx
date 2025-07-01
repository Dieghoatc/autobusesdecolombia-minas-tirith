import { useState, useEffect } from "react";
import { SliderItem } from "../sliderItem/SliderItem";
import usePostStore from "@/lib/store/usePostStore";

import styles from "./Slider.module.css";

export function Slider() {
  const [index, setIndex] = useState(0);
  const { post } = usePostStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 0));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className={styles.container}>
        <SliderItem
          type="post"
          index={index}
          image={post.image_url}
          title={post.title}
        />
      </div>
    </section>
  );
}
