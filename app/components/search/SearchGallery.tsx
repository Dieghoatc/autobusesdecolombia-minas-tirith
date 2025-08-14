import { Input } from "@/app/components/ui/input";
import Image from "next/image";

import SearchIcon from "@/assets/icons/icon_search.png";
import "./searchGallery.css";
import { useState, ChangeEvent } from "react";

interface SearchGalleryProps {
  search: (search: string) => void;
}

export default function SearchGallery({ search }: SearchGalleryProps) {
  const [showInput, setShowInput] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    search(event.target.value);
  }

  return (
    <div className="search-gallery_container">
      <div className="search-gallery_elements">
        <div className={`search-gallery_${showInput ? "showinput" : "input"}`}>
          <Input
            type="search"
            placeholder="Buscar"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          className="search-gallery-icon"
          onClick={() => setShowInput(!showInput)}
        >
          <Image
            src={SearchIcon}
            alt="icono de buscar"
            title="icono de buscar"
          />
        </div>
      </div>
    </div>
  );
}
