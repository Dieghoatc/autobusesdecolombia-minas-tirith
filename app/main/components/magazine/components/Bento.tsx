import Link from "next/link";
import { BentoItem } from "./BentoItem";

import { ApiPostsResponse } from "@/services/types/post.type";
import { orderById } from "@/lib/helpers/orderById";

import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/helpers/generateArray";

import "./bento.css";

const SKELETON_ITEM_COUNT = 3;

interface BentoProps {
  posts: ApiPostsResponse[];
  loading: boolean
}

export function Bento({ posts, loading }: BentoProps) {

  function orderHighestToLowestPosts(data: ApiPostsResponse[]) {
    return orderById(data, "post_id");
  }

  const sortedData = orderHighestToLowestPosts(posts as ApiPostsResponse[]);
  const skeletonItems = generateArray(SKELETON_ITEM_COUNT);

  return (
    <div className="magazine-bento">
      {loading
        ? skeletonItems.map((item: number) => (
            <Skeleton key={item} className="magazine-skeleton__bento" />
          ))
        : sortedData.slice(0, 3).map((post) => {
            const { post_id, slug } = post;
            return (
              <div className="magazine-bento__item" key={post.post_id}>
                <Link href={`/posts/${post_id}_${slug}`}>
                  <BentoItem post={post} />
                </Link>
              </div>
            );
          })}    
    </div>
  );
}
