"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Long descriptions start clamped to 3 lines
const COLLAPSIBLE_FROM = 240;

export function CategoryDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = text.length > COLLAPSIBLE_FROM;

  return (
    <div>
      <p
        className={`mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg ${
          collapsible && !expanded ? "line-clamp-3" : ""
        }`}
      >
        {text}
      </p>
      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mx-auto mt-3 flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          {expanded ? "Leer menos" : "Leer más"}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
