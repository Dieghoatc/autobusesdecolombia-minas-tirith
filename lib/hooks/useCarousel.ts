import { useState, RefObject } from "react";

interface UseReturnCarousel {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scroll: (direction: "left" | "right") => void;
}

export function useCarousel(sliderRef: RefObject<HTMLDivElement | null>): UseReturnCarousel {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      sliderRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
    setTimeout(() => {
      if (sliderRef.current) {
        setShowLeftArrow(sliderRef.current.scrollLeft > 0);
        setShowRightArrow(
          sliderRef.current.scrollLeft + sliderRef.current.clientWidth <
            sliderRef.current.scrollWidth - 10
        );
      }
    }, 300);
  };

  return {
    showLeftArrow,
    showRightArrow,
    scroll,
  };
}
