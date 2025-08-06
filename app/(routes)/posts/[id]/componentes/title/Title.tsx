import React from "react";

import "./title.css";

interface TitleProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export function Title({ level, text }: TitleProps) {
  return React.createElement(
    `h${level}`,
    { className: `text post-content-h${level}` },
    text
  );
}
