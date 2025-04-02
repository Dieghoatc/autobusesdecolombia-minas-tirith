import "./tabitem.css";

interface TabItemProps {
  value: string;
  isActive: boolean;
  handleClick: () => void;
}

export default function TabItem({
  value,
  isActive,
  handleClick,
}: TabItemProps) {
  return (
    <section
      className={`tabitem-container ${isActive ? "isactive" : ""}`}
      onClick={handleClick}
    >
      <p>{value}</p>
    </section>
  );
}
