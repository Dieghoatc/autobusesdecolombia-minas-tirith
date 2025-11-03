"use client";

import { useParams } from "next/navigation";
import { useFindPost } from "./hooks/useFindPost";

import styles from "./Post.module.css";

import { RenderBlocks } from "./componentes/RenderBlocks";
import { ABCLoader } from "@/app/components/abc-loader/ABCLoader";

export default function PostToID() {
  let id_post = 1;
  const params = useParams();

  if (params.slug) {
    id_post = Number(params.slug.toString().split("_")[0]);
  }
  
  const { post, loading } = useFindPost(id_post);

  if (!post) {
    return <div>No post found</div>;
  }
  if (loading) {
    return <ABCLoader />;
  }

  return (
    <main className={styles.container}>
      <article className={styles.article}>
        <RenderBlocks blocks={post.content} />
      </article>
    </main>
  );
}
