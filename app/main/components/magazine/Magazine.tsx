"use client";

import { useGetPosts } from "@/lib/hooks/useGetPosts";
import { LastNews } from "./components/lastnews/LastNews";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { Bento } from "./components/bento";

import "./magazine.css";

export function Magazine() {
  const { posts, loading } = useGetPosts();
  const isMobile = useIsMobile();

  return (
    <section className="magazine">
      {isMobile ? <LastNews posts={posts} loading={loading} /> : <Bento posts={posts} loading={loading} />}
    </section>
  );
}
