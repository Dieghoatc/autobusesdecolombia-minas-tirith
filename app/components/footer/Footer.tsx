import "./footer.css";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import x from "../../assets/x.png";
import tiktok from "../../assets/tiktok.png";
import discord from "../../assets/discord.png";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-social-media">
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.facebook.com/profile.php?id=100047484230275"
              title="Autobuses de Colombia en Facebook"
            >
              <img
                src={facebook.src}
                title="Logo de Facebook"
                alt="Logo de Facebook"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.instagram.com/autobusesdecolombiaoficial/"
              title="Autobuses de Colombia en Instagram"
            >
              <img
                src={instagram.src}
                title="Logo de Instagram"
                alt="Logo de Instagram"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://x.com/autobuscolombia"
              title="Autobuses de Colombia en X"
            >
              <img src={x.src} title="Logo de X" alt="Logo de X" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.tiktok.com/@autobusesdecol"
              title="Autobuses de Colombia en Tiktok"
            >
              <img
                src={tiktok.src}
                title="Logo de tiktok"
                alt="Logo de tiktok"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://discord.gg/RWMBbN4KCt"
              title="Autobuses de Colombia en Discord"
            >
              <img
                src={discord.src}
                title="Logo de Discord"
                alt="Logo de Discord"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2>
          © 2025 Autobuses de Colombia |{" "}
          <span className="dieghoatc">
            <a href="https://dieghoatc.com" title="Pagina del desarrollador">
              Dieghoatc.com
            </a>
          </span>
        </h2>
      </div>
    </div>
  );
}
