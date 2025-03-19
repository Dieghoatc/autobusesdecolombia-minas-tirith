import { ApiPostsResponse } from "@/app/api/dto/photo.dto";
import "./bentoItem.css";

interface BentoItemProps {
  post: ApiPostsResponse;
  style: string;
}

export function BentoItem({ post, style }: BentoItemProps) {
  const { title, image_url } = post;
  return (
    <article className={`bento-item ${style}`}>
      <img src={image_url} alt={title} className="bento-item__image" />
      <div className="bento-item__overlay">
        <div className="bento-item__content">
          <h2 className="bento-item__content__title">{title}</h2>
        </div>
      </div>
    </article>
  );
}
