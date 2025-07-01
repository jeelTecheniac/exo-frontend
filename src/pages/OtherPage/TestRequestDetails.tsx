import { useTranslation } from "react-i18next";
import {
  BlueCopyIcon,
  CommentRemarkIcon,
  CommentRemarkIconFrench,
  MenuListIcon,
  MenuListIconFrench,
  PdfIcon,
  RequestProgressIcon,
  RequestProgressIconFrench,
  UsdGreenIcon,
  UsdOrangeIcon,
  UsdVioletIcon,
} from "../../icons";
import AppLayout from "../../layout/AppLayout";
import Button from "../../lib/components/atoms/Button";
import Typography from "../../lib/components/atoms/Typography";
import DashBoardCard from "../../lib/components/molecules/DashBoardCard";

const TestRequestDetails = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <AppLayout>
        <div className="px-4 md:px-8 py-6">
          <div className="mb-6">
            <div className="cursor-pointer mb-4">
              {i18n.language === "en" ? (
                <MenuListIcon
                  width="100%"
                  height={30}
                  className="max-w-[700px]"
                />
              ) : (
                <MenuListIconFrench
                  width="100%"
                  height={30}
                  className="max-w-[700px]"
                />
              )}
            </div>
            <Typography
              size="xl_2"
              weight="extrabold"
              className="text-secondary-100"
            >
              {t("request_details")} # 1200
            </Typography>
          </div>
          <div className="flex gap-6">
            <div>
              {i18n.language === "en" ? (
                <RequestProgressIcon
                  width="100%"
                  height="100%"
                  viewBox="0 0 307 870"
                />
              ) : (
                <RequestProgressIconFrench
                  width="100%"
                  height="100%"
                  viewBox="0 0 307 870"
                />
              )}
            </div>
            <div className="flex flex-col gap-6">
              <div className="border border-secondary-30 bg-white rounded-lg">
                <div className="px-4 md:px-6 py-5 ">
                  <div className="flex justify-between items-center">
                    <Typography
                      size="base"
                      weight="bold"
                      className="text-secondary-100"
                    >
                      {t("request_details")}
                    </Typography>
                    <Button variant="outline" className="px-4 py-2 w-fit">
                      {t("view_more")}
                    </Button>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="px-4 md:px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <DashBoardCard
                      icon={<BlueCopyIcon width={44} height={44} />}
                      count={2}
                      title={t("total_entity")}
                    />
                    <DashBoardCard
                      icon={<UsdGreenIcon width={44} height={44} />}
                      count={2200}
                      title={t("total_amount")}
                    />
                    <DashBoardCard
                      icon={<UsdVioletIcon width={44} height={44} />}
                      count={440}
                      title={t("total_tax_amount")}
                    />
                    <DashBoardCard
                      icon={<UsdOrangeIcon width={44} height={44} />}
                      count={4840}
                      title={t("total_amount_with_tax")}
                    />
                  </div>

                  {/* Details List */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      <Typography
                        className="text-secondary-60 min-w-[100px]"
                        size="sm"
                      >
                        {t("amount")}
                      </Typography>
                      <Typography className="text-secondary-100" size="sm">
                        2,500,000
                      </Typography>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      <Typography
                        className="text-secondary-60 min-w-[100px]"
                        size="sm"
                      >
                        {t("address")}
                      </Typography>
                      <Typography className="text-secondary-100" size="sm">
                        DRC, Eldara, Velmont, West Arindale
                      </Typography>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                      <Typography
                        className="text-secondary-60 min-w-[100px]"
                        size="sm"
                      >
                        {t("invoice_files")}
                      </Typography>
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-2 border border-secondary-60 rounded-full px-3 py-1.5 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                          <PdfIcon width={12} height={12} />
                          <Typography
                            size="xs"
                            weight="semibold"
                            className="text-secondary-100 whitespace-nowrap"
                          >
                            Taxe 2025_fichier.pdf
                            <span className="text-secondary-60 ml-1">
                              (5.3MB)
                            </span>
                          </Typography>
                        </div>
                        {/* Add more invoice files here if needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {i18n.language === "en" ? (
                  <CommentRemarkIcon width="100%" height="100%" />
                ) : (
                  <CommentRemarkIconFrench width="100%" height="100%" />
                )}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};
export default TestRequestDetails;
