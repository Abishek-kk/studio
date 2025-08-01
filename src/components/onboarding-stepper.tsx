"use client";

import { cn } from "@/lib/utils";
import { Check, FileUp, UserCheck, CalendarDays, MapPin } from "lucide-react";

const steps = [
  { name: "Upload Document", icon: FileUp },
  { name: "Verify Information", icon: UserCheck },
  { name: "Book Appointment", icon: CalendarDays },
  { name: "Ready for Visit", icon: MapPin },
];

type OnboardingStepperProps = {
  currentStep: number;
};

export function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-center"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              "relative",
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
            )}
          >
            {stepIdx < currentStep - 1 ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-all duration-300"
                >
                  <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : currentStep === stepIdx + 1 ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-border" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background transition-all duration-300"
                  aria-current="step"
                >
                  <step.icon className="h-5 w-5 text-primary" aria-hidden="true"/>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-border" />
                </div>
                <div
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background transition-colors"
                >
                  <step.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true"/>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
            <p className="absolute -bottom-7 w-max max-w-28 text-center text-xs text-muted-foreground left-1/2 -translate-x-1/2 sm:w-auto sm:min-w-32">{step.name}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
}
