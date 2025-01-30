import "./bentoItem.css";

interface Article {
  id_article: string;
  image_url: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
}

interface BentoItemProps {
  articles: Article;
}

export function BentoItem({ articles }: BentoItemProps) {
  return (
    <article className="bento-item">
      <img
        src={articles.image_url}
        alt={articles.title}
        className="bento-item__image"
      />
      <div className="bento-item__overlay">
        <div className="bento-item__content">
          <h2>{articles.title}</h2>
          <p>{articles.subtitle}</p>
        </div>
      </div>
    </article>
  );
}
