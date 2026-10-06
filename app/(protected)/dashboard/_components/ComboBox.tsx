"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { fieldInput } from "@/lib/constants/formStyles";

export interface ComboBoxOption {
  id: string;
  label: string;
}

interface ComboBoxProps {
  id?: string;
  options: ComboBoxOption[];
  value: string | null;
  onChange: (id: string | null) => void;
  placeholder: string;
  disabled?: boolean;
}

export function ComboBox({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between border px-3 text-sm disabled:opacity-50",
            fieldInput,
            !selected && "text-zinc-500"
          )}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[--radix-popover-trigger-width] p-0 bg-zinc-950 border-zinc-800 text-zinc-200"
      >
        <Command className="bg-zinc-950 text-zinc-200">
          <CommandInput
            placeholder={`Buscar ${placeholder.toLowerCase()}...`}
            className="placeholder:text-zinc-500"
          />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
              Sin resultados
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={`${option.label} ${option.id}`}
                  onSelect={() => {
                    onChange(option.id === value ? null : option.id);
                    setOpen(false);
                  }}
                  className="text-zinc-200 data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white"
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto w-4 h-4",
                      option.id === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
