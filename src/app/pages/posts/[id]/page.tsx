"use client";
import { useParams } from "next/navigation";
import Footer from "@/app/components/footer/Footer";
import { Hero } from "@/app/components/hero/Hero";

import "./post.css";
import Header from "@/app/components/header/Header";
import { useFindOne } from "../../hooks/useGetOnePost";
import parse from "html-react-parser"

export default function PostsIdPage() {
  let id_post = "1";
  const params = useParams();

  if (params.id) {
    id_post = params.id.toString().split("_")[0];
  }

  const { post, loading } = useFindOne(id_post);

  if (!post) {
    return <div>No post found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      <Header />
      <Hero />
      <div className="article-container">
        <div className="article__content">
          {parse(post.content)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
