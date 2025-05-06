import "./quote.css";

interface QuoteProps {
  text: string;
  author?: string;
}

export function Quote({ text, author }: QuoteProps) {
  return (
    <div className="post-content-quote">
      <blockquote>
        {text}
      </blockquote>
      <p>— {author}</p>
    </div>
  );
}
