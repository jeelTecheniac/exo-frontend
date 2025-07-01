import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline";
  disable?: boolean;
  loading?: boolean;
}

const Button = ({ variant, className, disable, loading, ...props }: Props) => {
  const baseClasses =
    "text-base font-medium rounded-lg py-4 px-6 text-center w-full transition-all duration-300 ease-in-out transform hover:shadow-lg active:scale-95";

  const variantClasses = {
    primary:
      "bg-primary-150 text-white hover:bg-primary-200 hover:-translate-y-0.5 active:bg-primary-100",
    secondary:
      "text-primary-150 bg-white border border-secondary-50 hover:border-primary-150 hover:-translate-y-0.5 active:bg-gray-50",
    outline:
      "text-secondary-100 bg-white border border-secondary-30 hover:border-secondary-50 hover:-translate-y-0.5 active:bg-gray-50",
  };

  const buttonClasses = twMerge(
    clsx(
      baseClasses,
      variantClasses[variant],
      {
        "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none":
          disable || loading,
      },
      className
    )
  );

  return (
    <button disabled={disable || loading} className={buttonClasses} {...props}>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
