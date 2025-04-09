import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import CategorySelectItem from "./CategorySelectItem";
import { Label } from "@radix-ui/react-label";

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
  "Bus",
  "Doble piso",
  "Doble eje",
  "Cuadruple eje",
  "Microbus",
  "Van",
  "Buseton",
  "Trompon",
  "Camioneta",
  "Taxi",
  "Chiva",
  "Furgon",
  "Bala",
  "Eléctrico",
  "Hibrido",
  "Articulado",
  "Biarticulado",
  "Padron",
  "Empresarial",
  "Escolar",
  "Turismo",
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
      <div>
        <Label htmlFor="category">Categoria</Label>
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
      </div>
    );
  } else {
    return (
      <div>
        <Label htmlFor="category">Tipo de vehículo</Label>
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
      </div>
    );
  }
}
