"use client";

import { useGetPosts } from "@/lib/hooks/useGetPosts";
import { LastNews } from "./components/lastnews/LastNews";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { SkeletonNews } from "./components/skeleton/SkeletonNews";

import "./magazine.css";

export function Magazine() {
  const { posts, loading } = useGetPosts();

  if (loading) return <SkeletonNews />;

  return (
    <section className="magazine">
      <LastNews posts={posts} />
    </section>
  );
}
