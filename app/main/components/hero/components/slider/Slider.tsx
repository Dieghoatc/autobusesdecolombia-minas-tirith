import { useState, useEffect } from "react";
import { SliderItem } from "../sliderItem/SliderItem";
import usePostStore from "@/lib/store/usePostStore";

import styles from "./Slider.module.css";
import { LoaderIntro } from "@/components/loader/Loader";

export function Slider() {
  const [index, setIndex] = useState(0);
  const { post, loading } = usePostStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 0));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return <LoaderIntro />;

  return (
    <section className={styles.container}>
      <SliderItem
        type="post"
        index={index}
        url={post.image_url}
        title={post.title}
      />
    </section>
  );
}
