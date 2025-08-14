import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

interface InputProps {
  value: (value: string) => void;
  labelText: string;
  placeholder?: string;
  defaultValue?: string;
}

export default function InputCustom({
  value,
  labelText,
  placeholder,
  defaultValue,
}: InputProps) {
  return (
    <div>
      <Label htmlFor="input-text">{labelText}</Label>
      <Input
        type="text"
        id="input-text"
        placeholder={placeholder}
        onChange={(event) => value(event.target.value)}
        value={defaultValue}
      />
    </div>
  );
}
