import "./hero.css";
import { Slider } from "./components/Slider";
import Header from "../header/Header";

export function Hero() { 

  return (
    <div className="slider">
      <Header />
      <Slider />
    </div>
  );
}
