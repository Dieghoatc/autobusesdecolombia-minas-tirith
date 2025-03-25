import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  value: (value: string) => void;
  labelText: string;
  placeholder: string;
}

export default function InputCustom({ value, labelText, placeholder }: InputProps) {
  return (
    <>
      <Label htmlFor="input-text">{labelText}</Label>
      <Input
        type="text"
        id="input-text"
        placeholder={placeholder}
        onChange={(event) => value(event.target.value)}
      />
    </>
  );
}
