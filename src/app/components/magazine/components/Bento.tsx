import Link from "next/link";
import { BentoItem } from "./BentoItem";

import { ApiPostsResponse } from "@/app/api/autobusesApi.interfaces";
import { useHookFetch } from "@/app/hooks/useHookFetch";
import { orderById } from "@/app/utils/orderById";
import "./bento.css";

export function Bento() {
  const { data } = useHookFetch<ApiPostsResponse[]>("posts");

  function orderHighestToLowestPosts(data: ApiPostsResponse[]) {
    return orderById(data, "post_id");
  }

  const sortedData = orderHighestToLowestPosts(data as ApiPostsResponse[]);

  return (
    <section className="bento">
      {sortedData.map((post: ApiPostsResponse) => {
        const { post_id, slug } = post;
        return (
          <div key={post_id} className="bento-primary">
            <Link href={`/pages/posts/${post_id}_${slug}`}>
              <BentoItem post={post} />
            </Link>
          </div>
        );
      })}
    </section>
  );
}
