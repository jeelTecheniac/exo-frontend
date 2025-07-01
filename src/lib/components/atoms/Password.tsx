import { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import {
  EyeCloseIcon,
  EyeIcon,
  AlertTriangleRedIcon,
  CheckCircleYellowIcon,
} from "../../../icons";
import Typography from "./Typography";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  value?: string;
  passwordType?: "week" | "acceptable" | "strong" | "";
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: boolean;
  hint?: string;
}

const Password = ({
  className,
  passwordType,
  labelProps,
  value,
  onChange,
  name,
  error,
  hint,
  onBlur,
}: Props) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = () => {
    switch (passwordType) {
      case "week":
        return {
          colorClass: "bg-red",
          textColorClass: "text-red",
          text: "Week",
          filledBars: 1,
          iconName: "AlertTriangleRedIcon",
          suggestionText:
            "Use at least 8 characters. Combine words and numbers for better security.",
        };
      case "acceptable":
        return {
          colorClass: "bg-yellow",
          textColorClass: "text-yellow",
          text: "Acceptable",
          filledBars: 2,
          iconName: "CheckCircleYellowIcon",
          suggestionText: "Include special characters to make it more secure.",
        };
      case "strong":
        return {
          colorClass: "bg-green",
          textColorClass: "text-green",
          text: "Strong",
          filledBars: 3,
        };
      default:
        return {
          colorClass: "bg-secondary-30",
          textColorClass: "text-secondary-30",
          text: "",
          filledBars: 0,
        };
    }
  };

  const {
    colorClass,
    textColorClass,
    text,
    filledBars,
    suggestionText,
    iconName,
  } = getPasswordStrength();

  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    const icons = {
      AlertTriangleRedIcon,
      CheckCircleYellowIcon,
    };
    const Icon = icons[iconName as keyof typeof icons];
    return Icon ? <Icon className={`${textColorClass} size-[18px]`} /> : null;
  };

  const renderStrengthBars = () => {
    return Array(3)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className={`w-full h-1.5 rounded-lg ${
            index < filledBars ? colorClass : "bg-secondary-30"
          }`}
        />
      ));
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <Label {...labelProps}>{labelProps?.children}</Label>
        {text && (
          <div className="flex items-center gap-1.5">
            <Typography className={textColorClass}>{text}</Typography>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={t("minimum_8_characters")}
          className={className}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          hint={hint}
        />
        <div className="absolute right-4 top-0 h-[40px] flex items-center">
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? (
              <EyeIcon className="fill-secondary-60 size-7" />
            ) : (
              <EyeCloseIcon className="fill-secondary-60 size-7" />
            )}
          </span>
        </div>
      </div>
      {passwordType && (
        <div className="flex gap-2 mt-1.5">{renderStrengthBars()}</div>
      )}
      {suggestionText && (
        <div className="mt-1.5 flex gap-1.5">
          {getIcon(iconName)}
          <Typography className={textColorClass}>{suggestionText}</Typography>
        </div>
      )}
    </div>
  );
};

export default Password;
