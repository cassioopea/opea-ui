import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/ui/sheet";
import { cn } from "@/lib/utils";

export interface DetailDrawerProps {
  /** If true, the drawer is visible */
  open: boolean;
  /** Callback fired when the drawer should close */
  onOpenChange: (open: boolean) => void;
  /** Title of the drawer */
  title: string;
  /** Optional subtitle or description below the title */
  description?: React.ReactNode;
  /** The main content inside the drawer */
  children: React.ReactNode;
  /** Optional sticky footer (e.g. action buttons) */
  footer?: React.ReactNode;
  /** Width of the drawer. Defaults to default Sheet width, can be adjusted via className or specific sizing classes */
  className?: string;
}

/**
 * A standardized side sheet for displaying record details, forms, or settings.
 * Abstracted from `Sheet` to ensure consistent header and footer layouts across the app.
 */
export function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className={cn("flex w-full flex-col p-0 sm:max-w-lg", className)}
        aria-describedby={description ? "detail-drawer-description" : undefined}
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="text-heading font-semibold text-foreground">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription id="detail-drawer-description" className="text-label text-muted-foreground mt-1">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <div className="border-t border-border bg-muted/20 px-6 py-4">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
