import * as React from "react";
import { cn } from "@/lib/utils";

export interface DataRowProps {
  label: string;
  value: React.ReactNode;
  /** Larger, bolder value — e.g. the headline amount of a detail panel. */
  emphasis?: boolean;
  className?: string;
}

/** A label/value row for detail panels and drawers. */
export function DataRow({ label, value, emphasis = false, className }: DataRowProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <dt className="text-label text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "tabular-nums text-foreground",
          emphasis ? "text-body font-bold" : "text-label font-medium",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
