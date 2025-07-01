import { useTranslation } from "react-i18next";
import {
  AlertIcon,
  ArrowLeftIcon,
  CommentIcon,
  ContactInfoIcon,
  HistoryIcon,
  ProjectInfoIcon,
  Table3Icon,
  Table4Icon,
} from "../../icons";
import AppLayout from "../../layout/AppLayout";
import Button from "../../lib/components/atoms/Button";
import Typography from "../../lib/components/atoms/Typography";

const TestProjectDetails = () => {
  const { t } = useTranslation();
  return (
    <div>
      <AppLayout>
        <div className="px-8">
          <div className="flex justify-between items-center">
            <div>
              <div
                className="flex items-center gap-2 cursor-pointer mb-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeftIcon
                  width={16}
                  height={16}
                  className="text-primary-150"
                />
                <Typography
                  size="base"
                  weight="semibold"
                  className="text-primary-150"
                >
                  {t("back_to_dashboard")}
                </Typography>
              </div>
              <Typography
                size="xl_2"
                weight="extrabold"
                className="text-secondary-100"
              >
                {t("project_details")} #25-00001
              </Typography>
              <Typography
                size="base"
                weight="normal"
                className="text-secondary-60"
              >
                {t("last_updated_april_20_2025")}
              </Typography>
            </div>
            <Button
              variant="outline"
              className="flex items-center justify-center w-fit gap-2 py-3 h-fit"
            >
              <CommentIcon width={13} height={13} />
              <Typography>{t("comment")}(s)</Typography>
            </Button>
          </div>
          <div className="flex gap-5 py-7">
            <ProjectInfoIcon width="100%" height="100%" />
            <ContactInfoIcon width="100%" height="100%" />
          </div>
          <div className="mt-5">
            <Table3Icon width="100%" height="100%" />
          </div>
          <div className="mt-5">
            <Table4Icon width="100%" height="100%" />
          </div>
          <div className="mt-5">
            <AlertIcon width="100%" height="100%" />
          </div>
          <div className="mt-5 mb-4">
            <HistoryIcon width="100%" height="100%" />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};
export default TestProjectDetails;
