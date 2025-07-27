import {
  CdfCreamIcon,
  CdfGreenIcon,
  CdfPurpleIcon,
  UsdGreenIcon,
  UsdOrangeIcon,
  UsdVioletIcon,
} from "../../icons";

interface CurrencyBadgeProps extends React.SVGProps<SVGSVGElement> {
  currency: "USD" | "CDF";
  variant: "violet" | "green" | "orange";
  className?: string;
  width?: number;
  height?: number;
}

const CurrencyBadge = ({
  currency,
  variant,
  className,
  width = 32,
  height = 32,
  ...props
}: CurrencyBadgeProps) => {
  const IconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    "CDF:orange": CdfCreamIcon,
    "CDF:green": CdfGreenIcon,
    "CDF:violet": CdfPurpleIcon,
    "USD:green": UsdGreenIcon,
    "USD:orange": UsdOrangeIcon,
    "USD:violet": UsdVioletIcon,
  };

  const key = `${currency}:${variant}`;
  const IconComponent = IconMap[key];

  if (!IconComponent) return null;

  return (
    <IconComponent
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default CurrencyBadge;
