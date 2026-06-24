import { cn } from "@/lib/utils";
import { SearchInput } from "@/patterns/toolbar";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder?: string;
  filters?: {
    value: string;
    onChange: (val: string) => void;
    options: readonly FilterOption[];
  }[];
  className?: string;
}

/**
 * Search + segmented filters strip. Composes the <SearchInput> field and an
 * accessible <ToggleGroup> (roving focus, arrow-key nav, aria) instead of a raw
 * input and hand-rolled <button> pills.
 */
export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filters = [],
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border/70 p-5 sm:flex-row sm:items-center",
        className,
      )}
    >
      <SearchInput value={searchValue} onValueChange={onSearchChange} placeholder={searchPlaceholder} />

      {filters.length > 0 && (
        <div className="flex gap-4">
          {filters.map((group, index) => (
            <div key={index} className="flex rounded-lg border border-border bg-background p-1">
              <ToggleGroup
                type="single"
                value={group.value}
                onValueChange={(val) => val && group.onChange(val)}
                size="sm"
              >
                {group.options.map((f) => (
                  <ToggleGroupItem
                    key={f.value}
                    value={f.value}
                    className="rounded-md px-3.5 text-label font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm"
                  >
                    {f.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
