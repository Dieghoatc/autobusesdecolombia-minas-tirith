"use client";

import { useParams } from "next/navigation";
import { useFindPost } from "./hooks/useFindPost";
import "./post.css";
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
    return <div>Loading...</div>;
  }  

  return (
    <div className="post-container">
      <div className="article-container">
        <div className="article__content">
          {loading ? (
            <LoaderIntro />
          ) : (
            <div className="post-content">
              <EditorRenderer data={post.content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
