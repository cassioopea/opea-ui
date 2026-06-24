import { Check } from "lucide-react";

export interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={label} className="flex-1 flex flex-col relative">
            <div className="flex items-center">
              <div
                className={`z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-caption font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md ring-4 ring-primary/10"
                    : done
                      ? "bg-success/12 text-success"
                      : "bg-accent text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-1 w-full -ml-1 transition-colors ${done ? "bg-success/30" : "bg-accent"}`}
                />
              )}
            </div>
            <p
              className={`mt-2 text-caption font-medium absolute top-8 -left-2 w-[80px] ${active ? "text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
