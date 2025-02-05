import Link from "next/link";
import { BentoItem } from "./BentoItem";

import { ApiPostsResponse } from "@/app/api/autobusesApi.interfaces";
import { useHookFetch } from "@/app/hooks/useHookFetch";
import { orderById } from "@/app/utils/orderById";
import { SkeletonBento } from "../../skeleton/SkeletonBento";
import "./bento.css";

export function Bento() {
  const { data, loading } = useHookFetch<ApiPostsResponse[]>("posts");

  function orderHighestToLowestPosts(data: ApiPostsResponse[]) {
    return orderById(data, "post_id");
  }

  const sortedData = orderHighestToLowestPosts(data as ApiPostsResponse[]);

  return (
    <div>
      {loading ? (
        sortedData.map((post: ApiPostsResponse) => {
          const { post_id, slug } = post;
          return (
            <section key={post_id} className="bento">
              <div className="bento-primary">
                <Link href={`/pages/posts/${post_id}_${slug}`}>
                  <BentoItem post={post} />
                </Link>
              </div>
            </section>
          );
        })
      ) : (
        <section className="bento">
          <SkeletonBento skeletonStyle={"bento-primary"} />
        </section>
      )}
    </div>
  );
}
