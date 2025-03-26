import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxCustomProps {
  setValue: (value: boolean) => void;
}

export function CheckboxCustom({setValue}: CheckboxCustomProps) {

  return (
    <div>
      <Checkbox
        id="terms"
        className="bg-white"
        onCheckedChange={() => setValue(true)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Es internacional?
      </label>
    </div>
  );
}
