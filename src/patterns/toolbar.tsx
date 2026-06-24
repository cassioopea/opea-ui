import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/ui/input";

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value: string;
  onValueChange: (value: string) => void;
}

/** Standard search field: the <Input> primitive with a leading search icon. */
export function SearchInput({
  value,
  onValueChange,
  className,
  placeholder = "Buscar...",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 bg-card pl-9 text-label"
        {...props}
      />
    </div>
  );
}

export interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Horizontal control strip for search + filters + actions, typically placed
 * at the top of a table card. Compose <SearchInput>, Buttons and Selects inside.
 */
export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 border-b border-border px-5 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
