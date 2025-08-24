import styles from "./List.module.css";

interface ListProps {
  items: string[];
}

export function List({ items }: ListProps) {
  return (
    <div className={styles.container}>
      <ul>
        {items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
