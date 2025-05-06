import "./list.css";

interface ListProps {
  style: "unordered" | "ordered";
  items: string[];
}

export function List({ style, items }: ListProps) {
  return (
    <ul className={`post-content-list post-content-list-style-${style}`}>
      {items.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
  );
}
