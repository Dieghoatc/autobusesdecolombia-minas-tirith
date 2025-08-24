import React from "react";
import styles from "./Title.module.css";

interface TitleProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export function Title({ level, text }: TitleProps) {
  console.log(level);
  return (
    <div className={styles.container}>
      <h1 className={styles[`h${level}`]}>{text}</h1>
    </div>
  );
}
