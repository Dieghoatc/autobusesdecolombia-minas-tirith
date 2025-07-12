"use client";

import { useState, useEffect, useMemo } from "react";
import SearchGallery from "@/components/search/SearchGallery";
const URL = process.env.NEXT_PUBLIC_ABC_API;

interface Photo {
  photo_id: number;
  serial: string;
  company: string;
  bodywork: string;
  chassis: string;
  author: string;
  url: string;
}

export default function ProvisionalSeach() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchPhoto, setSearchPhoto] = useState("");

  console.log(searchPhoto)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${URL}/photos`);
        const photos = await response.json();
        setPhotos(photos);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const searchPhotosMemo = useMemo(
    () =>
      (photos || []).filter(
        (photo: Photo) =>
          photo.serial.includes(searchPhoto) ||
          photo.company.includes(searchPhoto) ||
          photo.bodywork.includes(searchPhoto) ||
          photo.chassis.includes(searchPhoto) ||
          photo.author.includes(searchPhoto)
      ),
    [photos, searchPhoto]
  ); 
  

  function searchPhotos(search: string) {
    setSearchPhoto(search);
  }

  return (
    <div className="text-white">
      <h1>Provisional Seach</h1>
      <div className="galley-controls">
        <SearchGallery search={searchPhotos} />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {searchPhotosMemo.map((item: Photo) => (
          <div key={item.photo_id}>
            <img src={item.url} alt={item.serial} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
