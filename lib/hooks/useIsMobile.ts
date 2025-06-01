import { useEffect, useState } from "react";

export function useIsMobile(breakpoint: number = 426) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    
        const handleChange = () => setIsMobile(media.matches);
        handleChange();
    
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
      }, [breakpoint]);
    
      return isMobile;
}