import Link from "next/link";
import { ApiPostsResponse } from "@/services/types/post.type";
import { orderById } from "@/lib/helpers/orderById";

import styles from "./Bento.module.css";
import { BentoItem } from "./BentoItem";

interface BentoProps {
  posts: ApiPostsResponse[];
}

export function Bento({ posts }: BentoProps) {
  function orderHighestToLowestPosts(data: ApiPostsResponse[]) {
    return orderById(data, "post_id");
  }

  const sortedData = orderHighestToLowestPosts(posts as ApiPostsResponse[]);


  return (
    <div className={styles.container}>
      {sortedData.slice(0, 3).map((post) => {
        const { post_id, slug } = post;
        return (
          <div className={styles.item} key={post.post_id}>
            <Link href={`/posts/${post_id}_${slug}`}>
              <BentoItem post={post} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
