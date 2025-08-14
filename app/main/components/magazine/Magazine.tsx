import Link from "next/link";

import { useGetPosts } from "@/lib/hooks/useGetPosts";

import { ABCLoader } from "@/components/abcLoader";
import { Carousel } from "./components/carousel";
import { BentoItem } from "./components/bento_item";

import styles from "./Magazine.module.css";
import FeriaFlores from "@/assets/destinations/feria_flores.webp";

export function Magazine() {
  const { posts, loading } = useGetPosts();

  if (loading) {
    return <ABCLoader />;
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
              title="Viaja a Medellín"
              resume="Descubre la ciudad de la eterna primavera con los servicios de transporte terrestre."
              category="Destinos"
              icon="map"
            />
          </Link>
        </article>
        {posts.slice(3, posts.length).map((news) => (
          <article key={news.post_id}>
            <Link href={`/posts/${news.post_id}_${news.slug}`}>
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
