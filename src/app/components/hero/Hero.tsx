import "./hero.css";

export function Hero() {
  return (
    <div className="slider">
      <div className="slider-container">
        <div className="slider-image_container">
          <img
            className="slide"
            src="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1742279541/autobusesdecolombia/lvck6ml1zidmbryftdcf.webp"
            alt="noticias"
          />
        </div>
        <div className="slider-image_container">
          <img
            className="slide"
            src="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1742279337/autobusesdecolombia/lvck6ml1zidmbryftdcf.jpg"
            alt="noticias"
          />
        </div>
        <div className="slider-image_container">
          <img
            className="slide"
            src="https://res.cloudinary.com/dkj6yzrrk/image/upload/v1741574515/autobusesdecolombia/mjghhazxvqgnlrbkl8fa.webp"
            alt="noticias"
          />
        </div>
      </div>
    </div>
  );
}
