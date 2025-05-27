import { useState } from "react";

import "./tabsCategories.css";

import TabsItems from "../tabItem/TabItem"

interface TabsCategoriesProps {
  categoriesList: { key: string; label: string }[];
  setCategory: (category: string) => void;
}

export default function TabsCategories({
  categoriesList,
  setCategory,
}: TabsCategoriesProps) {

  const [activeCategory, setActiveCategory] = useState("all");

  function handleClick(category: string) {
    setActiveCategory(category);
    setCategory(category);
  }

  return (
    <div className="tabscategories-container">
      {categoriesList.map(({ key, label }) => (
        <TabsItems
          key={key}
          value={label}
          isActive={activeCategory === key}
          handleClick={() => handleClick(key)}
        />
      ))}
    </div>
  );
}
