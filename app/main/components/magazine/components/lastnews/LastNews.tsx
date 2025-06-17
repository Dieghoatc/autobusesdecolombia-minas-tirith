import { ApiPostsResponse } from "@/services/types/post.type";

import styles from "./LastNews.module.css";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface LastNewsProps {
  posts: ApiPostsResponse[];
  loading: boolean;
}

export function LastNews({ posts, loading }: LastNewsProps) {
  if (loading) {
    return (
      <div>
        <div className={styles.skeleton}>
          <Skeleton className={styles.skeleton_item}/>
          <Skeleton className={styles.skeleton_item}/>
          <Skeleton className={styles.skeleton_item}/>
        </div>
      </div>
    );
  }

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
