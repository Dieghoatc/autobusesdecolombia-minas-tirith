import { ApiPostsResponse } from "@/services/types/post.type";

import styles from "./LastNews.module.css";
import Link from "next/link";

interface LastNewsProps {
  posts: ApiPostsResponse[];
}

export function LastNews({ posts }: LastNewsProps) {
  return (
    <section className={styles.container}>
      <div className={styles.carousel}>
        {posts.slice(3, 6).map((post) => (
          <div key={post.post_id}>
            <Link href={`/posts/${post.post_id}_${post.slug}`}>
              <article key={post.post_id} className={styles.slide}>
                <div className={styles.image}>
                  <img src={post.image_url} alt={post.title} />
                </div>
                <div className={styles.title}>
                  <h1>{post.title}</h1>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
