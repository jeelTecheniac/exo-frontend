import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  BlueNoteIcon,
  FilterIcon,
  GreenRightIcon,
  PdfIcon,
  SearchIcon,
  UsdVioletIcon,
} from "../../../icons";
import Typography from "../../../lib/components/atoms/Typography";
import DashBoardCard from "../../../lib/components/molecules/DashBoardCard";
import RequestTable from "../../table/RequestTable";
import Input from "../../../lib/components/atoms/Input";
import Button from "../../../lib/components/atoms/Button";
import { useRef, useState } from "react";
import Filter from "../../../lib/components/molecules/Filter";

const ContractDetails = () => {
  const { t } = useTranslation();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleApplyDateFilter = (newRange: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setRange(newRange);
    setIsDatePickerOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header Section */}
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center gap-2 cursor-pointer mb-2"
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeftIcon
              width={16}
              height={16}
              className="text-primary-150 flex-shrink-0"
            />
            <Typography
              size="sm"
              weight="semibold"
              className="text-primary-150 truncate"
            >
              {t("back_to_dashboard")}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <Typography
              size="lg"
              weight="extrabold"
              className="text-secondary-100 break-words sm:text-xl md:text-2xl"
            >
              {t("contract_details")}{" "}
              {/* {project?.reference ? `#${project.reference}` : ""} */}
            </Typography>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <DashBoardCard
              icon={
                <BlueNoteIcon
                  width={32}
                  height={32}
                  className="sm:w-11 sm:h-11"
                />
              }
              count={10}
              title={t("number_of_request")}
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <DashBoardCard
              icon={
                <UsdVioletIcon
                  width={32}
                  height={32}
                  className="sm:w-11 sm:h-11"
                />
              }
              count={10}
              title={t("sum_of_request")}
            />
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 lg:col-span-1"
          >
            <DashBoardCard
              icon={
                <GreenRightIcon
                  width={32}
                  height={32}
                  className="sm:w-11 sm:h-11"
                />
              }
              count={10}
              title={t("accepted_requests")}
            />
          </motion.div>
        </motion.div>

        {/* Contract Info Section */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 sm:mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="p-4 sm:p-6 border-b border-gray-100"
            variants={itemVariants}
          >
            <Typography
              element="p"
              size="base"
              weight="bold"
              className="text-gray-900"
            >
              {t("contract_info")}
            </Typography>
          </motion.div>
          <motion.div
            className="p-4 sm:p-6 space-y-4 sm:space-y-0 sm:space-x-0 lg:space-x-6 lg:flex"
            variants={staggerContainer}
          >
            {/* Left Column */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 w-full lg:w-1/2">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  Signed By :
                </Typography>
                <Typography
                  className="text-gray-900 break-words text-sm sm:text-base"
                  weight="normal"
                >
                  Jeel Vachhni
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  Organization :
                </Typography>
                <Typography
                  className="text-gray-900 break-words text-sm sm:text-base"
                  weight="normal"
                >
                  ABC Organization
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  Date Created :
                </Typography>
                <Typography
                  className="text-gray-900 break-words text-sm sm:text-base"
                  weight="normal"
                >
                  24-10-2001
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  No of Request :
                </Typography>
                <Typography
                  className="text-gray-900 break-words text-sm sm:text-base"
                  weight="normal"
                >
                  2
                </Typography>
              </div>
            </div>

            {/* Right Column */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 w-full lg:w-1/2">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  Description :
                </Typography>
                <Typography
                  className="text-gray-900 break-words text-sm sm:text-base"
                  weight="normal"
                >
                  Hello Description
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  Position :
                </Typography>
                <Typography
                  className="text-gray-900 break-words text-sm sm:text-base"
                  weight="normal"
                >
                  Project Manager
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <Typography
                  className="text-gray-600 min-w-[120px] sm:min-w-[140px] text-sm"
                  weight="semibold"
                >
                  Uploaded Files :
                </Typography>
                <div className="flex-1">
                  <a
                    key={1}
                    // href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline break-all text-sm sm:text-base"
                  >
                    <PdfIcon width={16} height={16} />
                    {"test.pdf"}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Requests Section */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="p-4 sm:p-6 border-b border-gray-100"
            variants={itemVariants}
          >
            <Typography
              element="p"
              size="base"
              weight="bold"
              className="text-gray-900"
            >
              {t("requests")}
            </Typography>
          </motion.div>
          <motion.div className="p-4 sm:p-6" variants={tableVariants}>
            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4 mb-4 sm:mb-6">
              {/* Search Input */}
              <motion.div
                className="w-full sm:w-1/2"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by request no..."
                    className="pl-10 pr-4 bg-white border-gray-200 text-sm w-full h-10 focus:border-blue-500 focus:ring-blue-500"
                    //   onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 justify-end relative">
                <Button
                  variant="outline"
                  className="flex justify-center items-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2.5 sm:px-4 min-w-[80px] sm:min-w-[100px] h-9 sm:h-10 text-xs sm:text-sm"
                >
                  <ArchiveIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <Typography
                    className="text-gray-600"
                    element="span"
                    size="sm"
                    weight="semibold"
                  >
                    {t("Archive")}
                  </Typography>
                </Button>

                <Button
                  variant="outline"
                  className="flex justify-center items-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2.5 sm:px-4 min-w-[80px] sm:min-w-[100px] h-9 sm:h-10 text-xs sm:text-sm"
                  onClick={() => setIsDatePickerOpen(true)}
                >
                  <FilterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <Typography
                    className="text-gray-600"
                    element="span"
                    size="sm"
                    weight="semibold"
                  >
                    {t("Filter")}
                  </Typography>
                </Button>

                {/* Filter Dropdown */}
                {isDatePickerOpen && (
                  <div
                    ref={datePickerRef}
                    className="absolute top-full right-0 w-full sm:w-max z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
                  >
                    <Filter
                      startDate={range.startDate}
                      endDate={range.endDate}
                      onApply={handleApplyDateFilter}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <RequestTable
                data={[
                  {
                    amount: 23,
                    createdDate: "24-10-2001",
                    id: 1,
                    request_id: "1",
                    requestNo: 23,
                    status: "pending",
                  },
                ]}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContractDetails;
