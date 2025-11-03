import styles from "./Fact.module.css";

interface FactProps {
  title: string;
  text: string;
}

export function Fact({ title, text }: FactProps) {
  return (
    <div className={styles.container}>
      <h4 className="">{title}</h4>
      <p className="">{text}</p>
    </div>
  );
}
