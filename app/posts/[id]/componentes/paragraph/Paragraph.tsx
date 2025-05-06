import "./paragraph.css";

interface ParagraphProps {
  text: string;
  level?: "primary";
}

export function Paragraph({ level, text }: ParagraphProps) {
  return (
    <p className={`post-content-${level ? "principal-" : ""}p`}> {text}</p>
  );
}
