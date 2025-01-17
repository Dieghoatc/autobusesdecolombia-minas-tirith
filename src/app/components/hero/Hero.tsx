import autobusHero from "../../../assets/bushero.jpg";
import autobusHeroRight from "../../../assets/autobus-hero-right.jpg";
import  Image from "next/image";
import "./hero.css";

export function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-superposition-container">
        <div className="hero-image-container">
          <Image
            src={autobusHero}
            alt="hero-image"
            className="hero-image"
            priority
          />
          <Image
            src={autobusHeroRight}
            alt="hero-image-right"
            className="hero-image-right"
            priority
          />
        </div>

        <div className="hero-title">
          <h1>Autobuses de Colombia</h1>
          <p>
            Explora nuestra extensa colección de autobuses, características y
            empresas de transporte.
          </p>
          <h2>¡Mucho más para ver!</h2>
        </div>
      </div>
    </div>
  );
}
