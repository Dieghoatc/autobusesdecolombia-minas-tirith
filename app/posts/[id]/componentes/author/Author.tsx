import "./author.css";

interface AuthorProps {
  author: string;
}

export function Author({ author }: AuthorProps) {
  return (
    <div className="post-author">
      <span className="post-author_text">
        Por: <span>{author}</span>
      </span>
    </div>
  );
}
