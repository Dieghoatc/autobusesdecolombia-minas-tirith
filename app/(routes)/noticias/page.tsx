import Link from "next/link";
import Image from "next/image";
import { postsQuery } from "@/services/api/posts.query";
import { orderById } from "@/lib/helpers/orderById";
import styles from "./PostsList.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noticias | Autobuses de Colombia",
  description: "Las últimas noticias sobre autobuses y transporte público en Colombia.",
};

export default async function Posts() {
  const postsResponse = await postsQuery();
  const posts = orderById(postsResponse, "post_id");

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
                    <div className="relative w-full h-48">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
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
