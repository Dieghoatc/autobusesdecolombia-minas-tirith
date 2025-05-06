import { Clock, Calendar } from "lucide-react";

interface hedaerItemsProps {
  type: string;
  text: string;
}

export function HeaderItem({ type, text }: hedaerItemsProps) {
  return (
    <div className="post-header_items">
      {type === "date" && <Calendar className="post-header_icons" />}
      {type === "reading_time" && <Clock className="post-header_icons" />}
      <span>{text}</span>
    </div>
  );
}
