import * as React from "react";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  isCompleted?: boolean;
}

export interface WizardLayoutProps {
  /** The list of steps to display in the side/top bar */
  steps: WizardStep[];
  /** The current active step index (0-based) */
  currentStepIndex: number;
  /** Title of the wizard */
  title: React.ReactNode;
  /** Main content for the active step */
  children: React.ReactNode;
  /** Footer containing actions (Next/Back/Submit) */
  footer: React.ReactNode;
  /** Optional layout direction. Defaults to horizontal on mobile and vertical on desktop. */
  className?: string;
}

/**
 * A standard layout for multi-step processes (wizards).
 * Renders a step indicator alongside the main content area, with a sticky action footer.
 */
export function WizardLayout({
  steps,
  currentStepIndex,
  title,
  children,
  footer,
  className,
}: WizardLayoutProps) {
  return (
    <div className={cn("flex flex-col min-h-[600px] rounded-2xl border border-border bg-card shadow-card overflow-hidden", className)}>
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Sidebar / Step indicator */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-muted/20 p-6">
          <h2 className="text-heading font-semibold text-foreground mb-6">{title}</h2>
          
          <nav aria-label="Progress">
            <ol className="space-y-4">
              {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isPast = index < currentStepIndex || step.isCompleted;

                return (
                  <li key={step.id} className="relative">
                    {index !== steps.length - 1 && (
                      <div 
                        className={cn(
                          "absolute left-3.5 top-9 -bottom-2 w-px",
                          isPast ? "bg-primary" : "bg-border"
                        )}
                        aria-hidden="true" 
                      />
                    )}
                    <div className="group flex items-start">
                      <span className="flex h-9 items-center">
                        <span className={cn(
                          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-caption font-semibold",
                          isActive ? "border-2 border-primary bg-background text-primary" :
                          isPast ? "bg-primary text-primary-foreground" :
                          "border-2 border-border bg-background text-muted-foreground"
                        )}>
                          {isPast ? (
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </span>
                      </span>
                      <span className="ml-3 flex flex-col pt-1">
                        <span className={cn("text-label font-medium", isActive || isPast ? "text-foreground" : "text-muted-foreground")}>
                          {step.label}
                        </span>
                        {step.description && (
                          <span className="text-caption text-muted-foreground">
                            {step.description}
                          </span>
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col relative">
          <div className="flex-1 p-6 md:p-8">
            {children}
          </div>
          
          {/* Sticky Footer */}
          <div className="sticky bottom-0 border-t border-border bg-background p-6">
            {footer}
          </div>
        </div>

      </div>
    </div>
  );
}
