import "./fact.css";

interface FactProps {
  title: string;
  text: string;
}

export function Fact({ title, text }: FactProps) {
  return (
    <div className="post-content-fact">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {title}
      </h4>
      <p className="post-content-fact-p">{text}</p>
    </div>
  );
}
