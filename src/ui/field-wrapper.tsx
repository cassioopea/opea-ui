import React from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrapper({ label, error, children, className }: FieldWrapperProps) {
  // Injetamos a classe "peer" e manipulamos a visibilidade do placeholder dinamicamente
  let child = children;
  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<any>;
    child = React.cloneElement(element, {
      className: `${element.props.className || ""} peer placeholder:text-transparent focus:placeholder:text-muted-foreground/50`.trim(),
      placeholder: element.props.placeholder || " ",
    });
  }

  return (
    <div className={cn("relative mt-2", className)}>
      {child}
      <label
        className={`pointer-events-none absolute left-3 top-3 origin-left text-body transition-all peer-focus:-translate-y-5 peer-focus:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.85] bg-card px-1 ${error
            ? "text-destructive peer-focus:text-destructive"
            : "text-muted-foreground peer-focus:text-primary"
          }`}
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-caption font-medium text-destructive">{error}</p>}
    </div>
  );
}
