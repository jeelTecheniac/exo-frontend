import React from "react";
import Typography from "../atoms/Typography";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
}

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

const IconButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  className = "",
  textClassName = "",
}) => {
  const baseClasses =
    "flex items-center gap-3 transition-all duration-200 ease-in-out hover:translate-x-1 active:translate-x-0 ";
  const activeClasses =
    "border-l-4 border-primary-150 bg-primary-10 rounded-[8px] py-2 px-3 w-full hover:bg-primary-20 hover:border-primary-200";

  const iconProps: IconProps = {
    className: `stroke-secondary-60 transition-transform duration-200 ${
      isActive ? "" : "group-hover:scale-110"
    }`,
    width: isActive ? 28 : 32,
    height: isActive ? 28 : 32,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group ${baseClasses} ${
        isActive ? activeClasses : "hover:bg-gray-50/50"
      } ${className}`}
    >
      {React.cloneElement(icon as React.ReactElement<IconProps>, iconProps)}
      <Typography
        className={`${
          isActive ? "text-primary-150" : "text-secondary-60"
        } transition-colors duration-200 group-hover:text-primary-150 ${textClassName}`}
        size="xl"
        weight="semibold"
      >
        {label}
      </Typography>
    </button>
  );
};

export default IconButton;
