import Image from "next/image";

import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import x from "@/assets/x.png";
import tiktok from "@/assets/tiktok.png";
import discord from "@/assets/discord.png";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <ul className={styles.icons}>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/profile.php?id=100047484230275"
              title="Autobuses de Colombia en Facebook"
            >
              <Image
                src={facebook.src}
                title="Logo de Facebook"
                alt="Logo de Facebook"
                width={24}
                height={24}
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/autobusesdecolombiaoficial/"
              title="Autobuses de Colombia en Instagram"
            >
              <Image
                src={instagram.src}
                title="Logo de Instagram"
                alt="Logo de Instagram"
                width={24}
                height={24}
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/autobuscolombia"
              title="Autobuses de Colombia en X"
            >
              <Image
                src={x.src}
                title="Logo de X"
                alt="Logo de X"
                width={24}
                height={24}
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/@autobusesdecol"
              title="Autobuses de Colombia en Tiktok"
            >
              <Image
                src={tiktok.src}
                title="Logo de tiktok"
                alt="Logo de tiktok"
                width={24}
                height={24}
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/RWMBbN4KCt"
              title="Autobuses de Colombia en Discord"
            >
              <Image
                src={discord.src}
                title="Logo de Discord"
                alt="Logo de Discord"
                width={24}
                height={24}
              />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.info}>
        <h2> 2025 Autobuses de Colombia</h2>
        <span className={styles.dieghoatc}>developed by <span>Dieghoatc.com</span></span>
      </div>
    </div>
  );
}
