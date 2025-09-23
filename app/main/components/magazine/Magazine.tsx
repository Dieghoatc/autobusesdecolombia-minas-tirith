import { useMemo } from "react";
import Link from "next/link";

import { useGetPosts } from "@/lib/hooks/useGetPosts";

import { Carousel } from "./components/carousel";
import { BentoItem } from "./components/bento_item";

import styles from "./Magazine.module.css";
import FeriaFlores from "@/assets/destinations/feria_flores.webp";
import { MagazineSkeleton, MagazineSkeletonItem } from "./magazine-skeleton";

export function Magazine() {
  const { posts, loading } = useGetPosts();

  const skeletonItems = useMemo(() => Array.from({ length: 7 }), []);

  if (loading) {
    return (
      <div className={styles.container}>
        <section className={styles.bento}>
          <article className={styles.bento_principal}>
            <MagazineSkeleton />
          </article>
          {skeletonItems.map((_, index) => (
            <article key={index}>
              <MagazineSkeletonItem />
            </article>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.bento}>
        <article className={styles.bento_principal}>
          <Carousel posts={posts} />
        </article>
        <article>
          <Link href={`/destinos/medellin`}>
            <BentoItem
              image_url={FeriaFlores.src}
              title="Viaja a Medellín: Descubre la ciudad de la eterna primavera"
              category="Destinos"
              icon="map"
            />
          </Link>
        </article>
        {posts.slice(3, posts.length).map((news) => (
          <article key={news.post_id}>
            <Link href={`/noticias/${news.post_id}_${news.slug}`}>
              <BentoItem
                image_url={news.image_url}
                title={news.title}
                category={news.category}
                icon="newspaper"
              />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
