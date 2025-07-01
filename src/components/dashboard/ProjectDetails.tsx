import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CloseYellowIcon,
  CommentIcon,
  InfoIcon,
  PdfIcon,
} from "../../icons";
import AppLayout from "../../layout/AppLayout";
import Button from "../../lib/components/atoms/Button";
import Typography from "../../lib/components/atoms/Typography";
import AddressTable, { Data as AddressData } from "../table/AddressTable";
import RequestTable, { Data as RequestData } from "../table/RequestTable";
import History, { HistoryItem } from "./History";

const initialAddressData: AddressData[] = [
  {
    id: 1,
    city: "Ahmedabad",
    country: "India",
    municipality: "AMC",
    providence: "West Arindale",
  },
  {
    id: 2,
    city: "Ahmedabad",
    country: "India",
    municipality: "AMC",
    providence: "West Arindale",
  },
];

const initialRequestData: RequestData[] = [
  {
    id: 1,
    requestNo: 1200,
    amount: 123300,
    createdDate: "24-20-2001",
    status: "pending",
  },
];

const historyData: HistoryItem[] = [
  {
    id: "1",
    date: "24/10/2001",
    time: "2:30 PM",
    title: "Return the signed documents to the Secretariat",
    description: "Prepared a summary calculation note",
  },
  {
    id: "2",
    date: "24/10/2001",
    time: "2:30 PM",
    title: "Return the signed documents to the Secretariat",
    description: "Prepared a summary calculation note",
  },
  {
    id: "3",
    date: "Today",
    time: "2:30 PM",
    title: "Return the signed documents to the Secretariat",
  },
  {
    id: "4",
    date: "Yesterday",
    time: "2:30 PM",
    title: "Return the signed documents to the Secretariat",
    description: "Prepared a summary calculation note",
  },
];

const ProjectDetails = () => {
  const files = ["tax 2025_file.pdf", "tax 2025_file.pdf", "tax 2025_file.pdf"];
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div>
      <AppLayout>
        <div className="px-4 sm:px-6 md:px-8">
          <motion.div
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.div
                className="flex items-center gap-2 cursor-pointer mb-2"
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
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
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              >
                <Typography
                  size="xl_2"
                  weight="extrabold"
                  className="text-secondary-100"
                >
                  {t("project_details")} #25-00001
                </Typography>
              </motion.div>
              <Typography
                size="base"
                weight="normal"
                className="text-secondary-60"
              >
                {t("last_updated_april_20_2025")}
              </Typography>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="flex items-center justify-center w-fit gap-2 py-2 sm:py-3 h-fit mt-4 sm:mt-0 hover:bg-primary-50 transition-colors"
              >
                <CommentIcon width={13} height={13} />
                <Typography size="base">{t("comment")}(s)</Typography>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-4 w-full mt-4 sm:mt-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="bg-white p-4 sm:p-6 w-full rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <Typography
                size="base"
                weight="bold"
                className="text-secondary-100"
              >
                Project Info
              </Typography>
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                {[
                  { label: "Project Name:", value: "Renovation Project" },
                  { label: "Project Reference:", value: "PRJ-2025-001" },
                  {
                    label: "Amount:",
                    value: (
                      <>
                        <span className="text-secondary-60">USD</span> 2,500,000
                      </>
                    ),
                  },
                  { label: "Project Begin Date:", value: "01-06-2025" },
                  { label: "Project End Date:", value: "01-06-2025" },
                  { label: "Description:", value: "-" },
                  { label: "Upload Files:", value: "-" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-secondary-10 p-2 rounded transition-colors"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Typography
                      size="sm"
                      weight="normal"
                      className="text-secondary-60 w-full sm:w-32"
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      size="sm"
                      weight="normal"
                      className="text-secondary-100"
                    >
                      {item.value}
                    </Typography>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 w-full rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <Typography
                size="base"
                weight="bold"
                className="text-secondary-100"
              >
                Contact Info
              </Typography>
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                {[
                  { label: "Signed By:", value: "Jean Mukendi" },
                  { label: "Position:", value: "Project Manager" },
                  { label: "Organization:", value: "ABC Construction Ltd." },
                  { label: "Place:", value: "Goma, North Kivu" },
                  { label: "Date of Signing:", value: "01-06-2025" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-secondary-10 p-2 rounded transition-colors"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Typography
                      size="sm"
                      weight="normal"
                      className="text-secondary-60 w-full sm:w-32"
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      size="sm"
                      weight="normal"
                      className="text-secondary-100"
                    >
                      {item.value}
                    </Typography>
                  </motion.div>
                ))}
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                >
                  <Typography
                    size="sm"
                    weight="normal"
                    className="text-secondary-60 w-full sm:w-32"
                  >
                    Upload Files:
                  </Typography>
                  <div className="flex flex-col gap-2">
                    {files.map((file, index) => (
                      <motion.div
                        key={index}
                        className="border border-secondary-30 rounded-full flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 cursor-pointer hover:bg-secondary-10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <PdfIcon width={16} height={16} />
                        <Typography
                          size="sm"
                          weight="normal"
                          className="text-secondary-100"
                        >
                          {file}
                        </Typography>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4 sm:mt-5 bg-white p-4 sm:p-6 rounded-lg shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Typography
              size="base"
              weight="bold"
              className="text-secondary-100"
            >
              Address
            </Typography>
            <motion.div
              className="mt-4 sm:mt-6 overflow-x-auto"
              variants={itemVariants}
            >
              <AddressTable data={initialAddressData} />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4 sm:mt-5 bg-white p-4 sm:p-6 rounded-lg shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Typography
              size="base"
              weight="bold"
              className="text-secondary-100"
            >
              Requests
            </Typography>
            <motion.div
              className="mt-4 sm:mt-6 overflow-x-auto"
              variants={itemVariants}
            >
              <RequestTable data={initialRequestData} />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4 sm:mt-5 rounded-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
          >
            <div className="bg-[#FFECD7] border border-[#FFB15D] rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center px-3 sm:px-4 py-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <InfoIcon width={20} height={20} />
                <Typography
                  size="sm"
                  weight="semibold"
                  className="text-[#B54708]"
                >
                  Your request has been reached at financial authority.
                </Typography>
              </div>
              <motion.div
                className="mt-2 sm:mt-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CloseYellowIcon width={24} height={24} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 sm:mt-5 mb-4 w-full border rounded-md bg-white shadow-lg p-4 sm:p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            <Typography className="mb-4" size="base" weight="bold">
              History
            </Typography>
            <History items={historyData} />
          </motion.div>
        </div>
      </AppLayout>
    </div>
  );
};

export default ProjectDetails;
