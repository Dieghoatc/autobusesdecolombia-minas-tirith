
"use client";

import { useGetPosts } from "@/lib/hooks/useGetPosts";
import { LastNews } from "./components/lastnews/LastNews";
import "./magazine.css";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { Bento } from "./components/Bento";

export function Magazine() {
  const { posts, loading } = useGetPosts();
  const isMobile = useIsMobile();

  return (
    <section className="magazine">
      {isMobile ? <LastNews posts={posts} /> : <Bento posts={posts} loading={loading} />}
    </section>
  );
}
