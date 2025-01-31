import { ApiPostsResponse } from "@/app/api/autobusesApi.interfaces";
import "./bentoItem.css";

interface BentoItemProps {
  post: ApiPostsResponse;
}

export function BentoItem({ post }: BentoItemProps) {
  const { title, image_url } = post;
  return (
    <article className="bento-item">
      <img src={image_url} alt={title} className="bento-item__image" />
      <div className="bento-item__overlay">
        <div className="bento-item__content">
          <h2 className="bento-item__content__title">{title}</h2>
        </div>
      </div>
    </article>
  );
}
