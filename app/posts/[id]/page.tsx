"use client";

import { useParams } from "next/navigation";
import { useFindPost } from "./hooks/useFindPost";

import "./post.css";

import { RenderBlocks } from "./componentes/RenderBlocks";
import { LoaderIntro } from "@/app/main/components/loader/LoaderIntro";

export default function PostToID() {
  let id_post = "1";
  const params = useParams();

  if (params.id) {
    id_post = params.id.toString().split("_")[0];
  }

  const { post, loading } = useFindPost(id_post);

  if (!post) {
    return <div>No post found</div>;
  }
  if (loading) {
    return <LoaderIntro />;
  }

  return (
    <main className="post-container">
      <article className="post-article">
        <RenderBlocks blocks={post.content} />
      </article>
    </main>
  );
}
