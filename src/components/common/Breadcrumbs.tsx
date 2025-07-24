import { useTranslation } from "react-i18next";
import { RightGrayIcon } from "../../icons";
import Typography from "../../lib/components/atoms/Typography";

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center text-sm text-gray-500">
      {crumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && (
            <span className="mx-2 text-gray-400">
              <RightGrayIcon className="w-6 h-6" />
            </span>
          )}

          {crumb.path ? (
            <Typography
              size="base"
              weight="semibold"
              className="text-primary-150"
            >
              <a href={crumb.path}>{t(crumb.label)}</a>
            </Typography>
          ) : (
            <Typography
              size="base"
              weight="normal"
              className="text-gray-500"
            >
              {t(crumb.label)}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
