"use client";

import Link from "next/link";
import { useGetPosts } from "../../../lib/hooks/useGetPosts";
import styles from "./PostsList.module.css";
import { ABCLoader } from "@/app/components/abc-loader";

export default function Posts() {
  const { posts, loading } = useGetPosts();

  if (loading) return <ABCLoader />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Noticias</h1>
        <div className={styles.grid}>
          {posts.map((post) => (
            <div key={post.post_id}>
              <Link href={`/noticias/${post.post_id}`}>
                <div className={styles.postCard}>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className={styles.postImage}
                    />
                  )}
                  <div className={styles.postContent}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
