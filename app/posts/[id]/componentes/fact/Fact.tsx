import "./fact.css";

interface FactProps {
  title: string;
  text: string;
}

export function Fact({ title, text }: FactProps) {
  return (
    <div className="post-content-fact">
      <h3 className="post-content-fact-h3">{title}</h3>
      <p className="post-content-fact-p">{text}</p>
    </div>
  );
}
