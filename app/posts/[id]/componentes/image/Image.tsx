import "./image.css";

interface ImageProps {
  src: string;
  alt: string;
  overlay?: string;
  photograper: string;
}

export function Image({ src, alt, overlay, photograper }: ImageProps) {
  return (
    <section>
      <div className="post-image_container">
        <figure>
          <img src={src} alt={alt} />
        </figure>
        {overlay && (
          <div className="post-image_overlay">
            <span>{overlay}</span>
          </div>
        )}
      </div>
      <div className="post-image_author">
        <figcaption className="post-image-author-text">
          <span>{photograper}</span>
        </figcaption>
      </div>
    </section>
  );
}
