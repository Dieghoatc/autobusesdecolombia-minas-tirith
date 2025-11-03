import { useMemo } from "react";
import Link from "next/link";

import { useGetPosts } from "@/lib/hooks/useGetPosts";

import styles from "./Magazine.module.css";
import { Skeleton } from "@/app/components/ui/skeleton";

export function Magazine() {
  const { posts, loading } = useGetPosts();

  const skeletonItems = useMemo(() => Array.from({ length: 11 }), []);

  if (loading) {
    return (
      <section className={styles.bento}>
        <article className={styles.bento_primary}>
          <Skeleton className="w-full h-full bg-slate-900" />
        </article>
        {skeletonItems.map((_, index) => (
          <article key={index} className={styles.bento_item}>
            <Skeleton className="w-full h-full bg-slate-900" />
          </article>
        ))}
      </section>
    );
  }

  return (
    <section className={styles.bento}>
      <article className={styles.bento_primary}>
        <Link href={`/noticias/${posts[0].post_id}_${posts[0].slug}`}>
          <picture className={styles.image_primary}>
            <img
              src={posts[0].image_url}
              alt={posts[0].title}
            />
          </picture>
          <div className={styles.header}>
            <h2>
              {posts[0].title}
            </h2>
          </div>
        </Link>
      </article>
      {posts.slice(1, 13).map((post) => (
        <article key={post.post_id} className={styles.bento_item} >
          <Link href={`/noticias/${post.post_id}_${post.slug}`}>
            <picture className={styles.image_item}>
              <img
                src={post.image_url}
                alt={post.title}

              />
              <div className={styles.overlay}></div>
            </picture>
            <div className={styles.header_item}>
              <h2>
                {post.title}
              </h2>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}
