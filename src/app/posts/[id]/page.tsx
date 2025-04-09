"use client";

import { useParams } from "next/navigation";
import { useFindPost} from "./hooks/useFindPost";
import ReactMarkdown from "react-markdown";
import { Loader } from "@/app/components/loader/Loader";

import "./post.css";

export default function PostsIdPage() {
  let id_post = "1";
  const params = useParams();

  if (params.id) {
    id_post = params.id.toString().split("_")[0];
  }

  const { post, loading } = useFindPost(id_post);

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div className="post-container">
      <div className="article-container">
        <div className="article__content">
          {loading ? (
            <div className="article-loader">
              <Loader />
            </div>
          ) : (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
