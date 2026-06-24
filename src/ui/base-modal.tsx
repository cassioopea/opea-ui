import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { cn } from "@/lib/utils";

export interface BaseModalProps {
  /** Controlled open state (Radix). */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Classes applied to the dialog content (e.g. `sm:max-w-md`). */
  className?: string;
}

/**
 * A titled modal built on top of <Dialog>. Composing the Radix primitive gives
 * focus trapping, Esc-to-close, scroll lock, the close button and proper aria
 * roles for free — instead of the previous hand-rolled overlay.
 */
export function BaseModal({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  className,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("gap-0 p-0 sm:max-w-[640px]", className)}>
        <DialogHeader className="border-b border-border/70 px-7 pb-5 pt-6 text-left">
          <DialogTitle className="text-title font-semibold text-foreground">{title}</DialogTitle>
          {subtitle && (
            <DialogDescription className="mt-1 text-body text-muted-foreground">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
