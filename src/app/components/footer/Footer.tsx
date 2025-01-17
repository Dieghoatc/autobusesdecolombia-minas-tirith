import "./footer.css";
import facebook from "../../../assets/facebook.png"
import instagram from "../../../assets/instagram.png"
import x from "../../../assets/x.png"
import tiktok from "../../../assets/tiktok.png"
import discord from "../../../assets/discord.png"

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
            >
              <img src={facebook.src} alt="Logo de Facebook" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.instagram.com/autobusesdecolombiaoficial/"
            >
              <img src={instagram.src} alt="Logo de Instagram" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://x.com/autobuscolombia"
            >
              <img src={x.src} alt="Logo de X" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.tiktok.com/@autobusesdecol"
            >
              <img src={tiktok.src} alt="Logo de tiktok" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://discord.gg/RWMBbN4KCt"
            >
              <img src={discord.src} alt="Logo de Discord" />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2>© 2025 Autobuses de Colombia | <span className="dieghoatc"><a href="https://dieghoatc.com">Dieghoatc.com</a></span></h2>
        <p>Todos los derechos reservados</p>
      </div>
    </div>
  );
}
