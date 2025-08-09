import styles from "./CompanyLogo.module.css";

interface CompanyLogoProps {
  isShow: boolean;
  logo: string;
}

export function CompanyLogo({ isShow, logo }: CompanyLogoProps) {
  return (
    <div className={styles.container}>
      <img src={logo} alt="company" className={isShow ? "" : styles.hidden} />
    </div>
  );
}
