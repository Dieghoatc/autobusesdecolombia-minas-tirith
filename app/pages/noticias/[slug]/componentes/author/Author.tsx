import styles from "./Author.module.css";
import avatar from "@/public/assets/logos/abc_logo_single.svg";

interface AuthorProps {
  author: string;
}

export function Author({ author }: AuthorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={avatar.src} alt="Avatar" />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{author}</span>
      </div>
    </div>
  );
}
