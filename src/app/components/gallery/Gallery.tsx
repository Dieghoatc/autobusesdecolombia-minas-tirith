import { useState } from "react";
import { ApiPhotosResponse } from "@/app/api/dto/photo.dto";
import { useGetPhotos } from "@/app/hooks/useGetPhotos";

import { orderById } from "@/app/utils/orderById";

import "./gallery.css";

import Card from "../main/components/Card/Card";
import SkeletonComponent from "../skeleton/Skeleton";
import TabsCategories from "./components/TabsCategories";

interface CategoryList {
  key: string;
  label: string;
  id?: number;
}
const categoriesList: CategoryList[] = [
  { key: "all", label: "Todos" },
  { key: "interdepartamental", label: "Interdepartamental", id: 1 },
  { key: "intermunicipal", label: "Intermunicipal", id: 2 },
  { key: "nuestros_recuerdos", label: "Nuestros Recuerdos", id: 5 },
];
export default function Gallery() {
  const { photos, loading } = useGetPhotos();
  const [category, setCategory] = useState("all");

  if (loading) return <SkeletonComponent />;

  function orderHighestToLowestPhotos(data: ApiPhotosResponse[]) {
    return orderById(data, "photo_id");
  }

  let sortedData = orderHighestToLowestPhotos(photos || []);

  const selectedCategory = categoriesList.find((cat) => cat.key === category);
  if (selectedCategory?.id) {
    sortedData = sortedData.filter(
      (photo) => photo.category_id === selectedCategory.id
    );
  }
  return (
    <div className="gallery-container">
      <TabsCategories
        categoriesList={categoriesList}
        setCategory={setCategory}
      />
      <div className="cards-container">
        {sortedData.map((photo) => (
          <Card key={photo.photo_id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
