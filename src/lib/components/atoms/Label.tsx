import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          "text-base font-normal text-secondary-60 block mb-1.5",
          className
        )
      )}
    >
      {children}
    </label>
  );
};

export default Label;
