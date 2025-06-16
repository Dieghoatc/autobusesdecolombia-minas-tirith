import { ApiPostsResponse } from "@/services/types/post.type";

import styles from "./LastNews.module.css";
import Link from "next/link";

interface LastNewsProps {
  posts: ApiPostsResponse[];
}

export function LastNews({ posts }: LastNewsProps) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Noticias</h2>
        <span>
          <Link href="/posts">Ver más</Link>
        </span>
      </div>
      <div className={styles.carousel}>
        {posts.slice(0, 6).map((post) => (
          <article key={post.post_id} className={styles.slide}>
            <div className={styles.image}>
              <img
                src={post.image_url}
                alt={post.title}
              />
            </div>
            <div className={styles.title}>
              <h1>{post.title}</h1>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
