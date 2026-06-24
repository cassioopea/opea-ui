import * as React from "react";
import { Building2, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";

export interface AccountOption {
  id: string;
  /** Primary line (e.g. apelido). */
  title: string;
  /** Secondary line (e.g. "CC 1973 · CNPJ …"). */
  subtitle?: string;
  /** Extra text matched by search but not displayed. */
  keywords?: string;
}

export interface AccountSelectorProps {
  options: AccountOption[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  /** Classes for the trigger button. */
  triggerClassName?: string;
  /** Width of the dropdown panel. */
  contentClassName?: string;
}

/**
 * Single, reusable account picker (search + list) built on Popover + Command.
 * Replaces the hand-rolled account dropdowns that were duplicated across the
 * app shell and the approval screen. Map any account shape to AccountOption.
 */
export function AccountSelector({
  options,
  value,
  onChange,
  placeholder = "Buscar por conta, apelido ou CNPJ...",
  triggerClassName,
  contentClassName,
}: AccountSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-left text-label text-foreground transition hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring/20",
            triggerClassName,
          )}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Building2 className="h-3.5 w-3.5" />
            </span>
            <span className="truncate font-semibold">{selected?.title ?? "Selecionar conta"}</span>
            {selected?.subtitle && (
              <span className="truncate text-muted-foreground">· {selected.subtitle}</span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)}
        align="start"
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>Nenhuma conta encontrada</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.id}
                  value={`${o.title} ${o.subtitle ?? ""} ${o.keywords ?? ""}`}
                  onSelect={() => {
                    onChange(o.id);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{o.title}</span>
                    {o.subtitle && (
                      <span className="block truncate text-caption text-muted-foreground">
                        {o.subtitle}
                      </span>
                    )}
                  </span>
                  {o.id === value && <Check className="h-4 w-4 shrink-0 text-primary" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
