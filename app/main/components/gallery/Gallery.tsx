import { LastPhotos } from "./components/lastPhotos";
import { CategoryList } from "./components/categoryList";

import { useTransportCategories } from "@/lib/hooks";

export function Gallery() {
  const { transportCategories } = useTransportCategories();

  return (
    <section>
      <LastPhotos />{transportCategories.map((category) => (
        <CategoryList
          key={category.transport_category_id}
          transportCategory={category}
        />
      ))} 
    </section>
  );
}
