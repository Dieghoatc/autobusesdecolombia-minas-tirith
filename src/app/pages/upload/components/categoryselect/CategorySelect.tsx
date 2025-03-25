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
];

const carTypes = [
  "bus",
  "doble piso",
  "doble eje,",
  "cuadruple eje",
  "microbus",
  "van",
  "buseton",
  "trompon",
  "camioneta",
  "taxi",
  "chivas",
  "furgon",
  "bala",
  "eléctrico",
  "hibrido",
  "articulado",
  "bi-articulado",
  "padron",
  "empresarial",
  "escolar",
  "turismo",
];

interface CategorySelectProps {
  setValue: (item: string) => void;
  type: "category" | "carType";
}

export default function CategorySelect({
  setValue,
  type,
}: CategorySelectProps) {
  if (type === "category") {
    return (
      <>
        <Select onValueChange={(value) => setValue(value)}>
          <SelectTrigger aria-label="Selecciona una categoria">
            <SelectValue placeholder="Selecciona una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {categories.map((item) => {
                return <CategorySelectItem key={item} item={item} />;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
    );
  } else {
    return (
      <>
        <Select onValueChange={(value) => setValue(value)}>
          <SelectTrigger aria-label="Selecciona tipo de vehículo">
            <SelectValue placeholder="Selecciona tipo de vehículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              {carTypes.map((item) => {
                return <CategorySelectItem key={item} item={item} />;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
    );
  }
}
