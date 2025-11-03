import styles from "./Paragraph.module.css";

interface ParagraphProps {
  text: string;
  level?: "primary";
}

export function Paragraph({ level, text }: ParagraphProps) {
  return (
    <p className={`${styles[`${level ? "primary" : "secondary"}`]} `}>{text}</p>
  );
}
