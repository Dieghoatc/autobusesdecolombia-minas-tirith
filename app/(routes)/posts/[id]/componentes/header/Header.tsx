import "./header.css";
import { HeaderItem } from "./HeaderItem";

type HeaderItemProps = {
  type: string;
  text: string;
};

interface HeaderProps {
  items: HeaderItemProps[];
}
export function Header({ items }: HeaderProps) {
  return (
      <header>
        <div className="post-header">
          {items.map((item, index) => {
            return (
              <div key={index}>
                <HeaderItem type={item.type} text={item.text} />
              </div>
            );
          })}
        </div>
      </header>
  );
}
