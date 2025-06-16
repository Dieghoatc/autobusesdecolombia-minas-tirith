
"use client";

import { useGetPosts } from "@/lib/hooks/useGetPosts";
import { LastNews } from "./components/lastnews/LastNews";
import "./magazine.css";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export function Magazine() {
  const { posts } = useGetPosts();
  const isMobile = useIsMobile();

  return (
    <section className="magazine">
      {isMobile ? <LastNews posts={posts} /> : ""}
    </section>
  );
}
