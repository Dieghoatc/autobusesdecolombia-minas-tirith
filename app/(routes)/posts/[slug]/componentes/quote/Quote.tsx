import styles from "./Quote.module.css";

interface QuoteProps {
  text: string;
  author?: string;
}

export function Quote({ text, author }: QuoteProps) {
  return (
    <div className={styles.container}>
      <blockquote className={styles.quote}>{text}</blockquote>
      <p className={styles.author}>— {author}</p>
    </div>
  );
}
