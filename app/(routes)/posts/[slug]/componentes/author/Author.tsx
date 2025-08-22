import styles from "./Author.module.css";
import avatar from "@/assets/logo_header.png";

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
        <span>22.08.2025</span>
      </div>
    </div>
  );
}
