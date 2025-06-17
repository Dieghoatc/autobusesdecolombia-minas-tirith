"use client";

import { useGetPosts } from "@/lib/hooks/useGetPosts";
import { LastNews } from "./components/lastnews/LastNews";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { Bento } from "./components/bento";
import { SkeletonNews } from "./components/skeleton/SkeletonNews";

import "./magazine.css";

export function Magazine() {
  const { posts, loading } = useGetPosts();
  const isMobile = useIsMobile();

  if (loading) return <SkeletonNews />;

  return (
    <section className="magazine">
      {isMobile ? <LastNews posts={posts} /> : <Bento posts={posts} />}
    </section>
  );
}
