import Link from "next/link";
import { BentoItem } from "./BentoItem";

import { ApiPostsResponse } from "@/app/api/dto/photo.dto";
import { useHookFetch } from "@/app/hooks/useHookFetch";
import { orderById } from "@/app/utils/orderById";

import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "../../../utils";
import "./bento.css";

const SKELETON_ITEM_COUNT = 5;

export function Bento() {
  const { data, loading } = useHookFetch<ApiPostsResponse[]>("posts");

  function orderHighestToLowestPosts(data: ApiPostsResponse[]) {
    return orderById(data, "post_id");
  }

  const sortedData = orderHighestToLowestPosts(data as ApiPostsResponse[]);
  const skeletonItems = generateArray(SKELETON_ITEM_COUNT);

  return (
    <div className="magazine-bento">
      {loading ? (
        skeletonItems.map((item: number) => (
          <Skeleton key={item} className="magazine-skeleton__bento" />
        ))
      ):
      sortedData.map((post) => {
        const { post_id, slug } = post;
        return (
          <div className="magazine-bento__item" key={post.post_id}>
            <Link href={`/pages/posts/${post_id}_${slug}`} >
              <BentoItem post={post} style="" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
