import { CheckSimpleIcon } from "../../icons";
import { useEffect, useRef } from "react";

interface StepperProps {
  steps: {
    id: number;
    title: string;
  }[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  variant?: "outline" | "default";
}

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  variant = "default",
}: StepperProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollContainerRef.current && window.innerWidth < 768) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  const handleStepClick = (index: number) => {
    if (onStepClick) {
      onStepClick(index);
    }
  };
  
  return (
    <div
      ref={scrollContainerRef}
      className="flex md:justify-center w-full py-4 overflow-x-auto pl-4 md:pl-0">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          const stepCircleClass =
            variant === "outline"
              ? isCompleted
                ? "border border-primary-150 bg-primary-150 text-white"
                : isCurrent
                ? "border border-primary-150 text-primary-150 bg-white"
                : "border  border-gray-300 text-gray-400 bg-white"
              : isCompleted
              ? "bg-primary-150 text-white"
              : isCurrent
              ? "bg-primary-150 text-white"
              : "bg-gray-200 text-gray-400";

          const stepTextClass =
            variant === "outline"
              ? index <= currentStep
                ? "text-primary-100"
                : "text-gray-400"
              : index <= currentStep
              ? "text-primary-100"
              : "text-gray-400";

          return (
            <div
              key={step.id}
              className="flex items-center flex-shrink-0"
              onClick={() => handleStepClick(index)}
              style={{ cursor: "pointer" }}>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${stepCircleClass}`}>
                {isCompleted ? (
                  <CheckSimpleIcon width={16} height={16} />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium whitespace-nowrap ${stepTextClass}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="mx-3 md:mx-4 w-8 md:w-16 h-[1px] bg-gray-300 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
