import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SurfaceCard } from "@/ui/surface-card";

export interface ActionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  desc: string;
  icon: LucideIcon;
}

/**
 * A clickable shortcut card. Composes the interactive <SurfaceCard> surface
 * (hover lift, border, shadow) rendered as a <button> via `asChild`.
 */
export function ActionCard({ label, desc, icon: Icon, className, ...props }: ActionCardProps) {
  return (
    <SurfaceCard asChild interactive padding="sm">
      <button
        className={cn(
          "group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
          className,
        )}
        {...props}
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-3 text-body font-semibold text-foreground">{label}</p>
        <p className="text-caption text-muted-foreground">{desc}</p>
      </button>
    </SurfaceCard>
  );
}
