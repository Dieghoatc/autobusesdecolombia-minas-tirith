import "./imagedetails.css";

interface ImageDetailsProps {
  type: string;
  info: string;
  icon: string;
}

export function ImageDetails({ info, icon, type }: ImageDetailsProps) {
  return (
    <div className="imagedetails-container">
      <div className="imagedetails-icon">
        <img src={icon} alt={type} />
      </div>
      <div>
        <p>{info}</p>
      </div>
    </div>
  );
}
