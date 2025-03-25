

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CategorySelectItem from "./CategorySelectItem";

const categories = [
    "Interdepartamental",
    "Intermunicipal",
    "Especial",
    "Mixto",
    "Nuestros Recuerdos",
    "Urbanos",
    "Taxi",
    "Estatal",
]

interface CategorySelectProps {
    setCategory: (item: string) => void
}


export default function CategorySelect({setCategory}: CategorySelectProps) {
  

  return (
    <>
      <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger aria-label="Selecciona una categoria">
          <SelectValue placeholder="Selecciona una categoria" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {categories.map((item) => {
                    return <CategorySelectItem key={item} item={item} />
                })}
            </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
