import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CdfCreamIcon,
  CdfGreenIcon,
  CdfPurpleIcon,
  CommentIcon,
  PdfIcon,
} from "../../../icons";
import Typography from "../../../lib/components/atoms/Typography";
import Button from "../../../lib/components/atoms/Button";
import DashBoardCard from "../../../lib/components/molecules/DashBoardCard";
import AddressTable from "../../table/AddressTable";
import ContractTable from "../../table/ContractTable";

const ProjectDetails = () => {
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(true);

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
    <div>
      <>
        <div className={"relative px-4 sm:px-6 md:px-8"}>
          <motion.div
            className="flex flex-col sm:flex-row sm:justify-between sm:items-start lg:items-center gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex-1 min-w-0">
              <motion.div
                className="flex items-center gap-2 cursor-pointer mb-2"
                onClick={() => window.history.back()}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowLeftIcon
                  width={16}
                  height={16}
                  className="text-primary-150 flex-shrink-0"
                />
                <Typography
                  size="base"
                  weight="semibold"
                  className="text-primary-150 truncate"
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
                  className="text-secondary-100 break-words"
                >
                  {t("project_details")}{" "}
                  {/* {project?.reference ? `#${project.reference}` : ""} */}
                </Typography>
              </motion.div>
              <Typography
                size="base"
                weight="normal"
                className="text-secondary-60"
              >
                {t("last_updated")}
              </Typography>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Button
                variant="outline"
                className="flex items-center justify-center w-full sm:w-fit gap-2 py-2 sm:py-3 h-fit hover:bg-primary-50 transition-colors"
              >
                <CommentIcon width={13} height={13} />
                <Typography size="base">{t("comment")}(s)</Typography>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-3 md:mt-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={cardVariants}>
              <DashBoardCard
                icon={<CdfCreamIcon width={44} height={44} />}
                count={10}
                title={t("project_amount")}
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <DashBoardCard
                icon={<CdfPurpleIcon width={44} height={44} />}
                count={10}
                title={t("sum_of_contracts_amount")}
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <DashBoardCard
                icon={<CdfCreamIcon width={44} height={44} />}
                count={10}
                title={t("sum_of_requests_amount")}
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <DashBoardCard
                icon={<CdfGreenIcon width={44} height={44} />}
                count={0}
                title={t("sum_of_approved_amount")}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-5 bg-white rounded-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <motion.div className="p-6" variants={itemVariants}>
              <Typography element="p" size="base" weight="bold">
                {t("project_info")}
              </Typography>
            </motion.div>
            <motion.div
              className="flex flex-col lg:flex-row w-full gap-4 pb-6 px-6"
              variants={staggerContainer}
            >
              <div className="border border-secondary-30 rounded-lg p-6 flex flex-col gap-4 w-full">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Project Name :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    Renovation Project
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Funded By :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    ABC Organization
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Amount :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    <span className="text-secondary-60">USD</span>
                    24,6000
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Project End Date :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    24-10-2020
                  </Typography>
                </div>
              </div>
              <div className="border border-secondary-30 rounded-lg p-6 flex flex-col gap-4 w-full">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Project Reference :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    PRJ-433
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Project Begin Date :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    23-12-2030
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Description :
                  </Typography>
                  <Typography
                    className="text-secondary-100 break-words"
                    size="sm"
                    weight="normal"
                  >
                    Hello Description
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Typography
                    className="text-secondary-60 min-w-[140px]"
                    size="sm"
                    weight="normal"
                  >
                    Uploaded Files :
                  </Typography>

                  <a
                    key={1}
                    // href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline break-all"
                  >
                    <PdfIcon width={16} height={16} />
                    {"test.pdf"}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-5 bg-white rounded-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <motion.div className="p-6" variants={itemVariants}>
              <Typography element="p" size="base" weight="bold">
                {t("location")}
              </Typography>
            </motion.div>
            <motion.div
              className="p-6 overflow-x-auto"
              variants={tableVariants}
            >
              <AddressTable
                data={[
                  {
                    city: "Ahmedabad",
                    country: "India",
                    id: 1,
                    municipality: "AMC",
                    providence: "AMC",
                  },
                ]}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="mt-5 bg-white rounded-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <motion.div className="p-6" variants={itemVariants}>
              <Typography element="p" size="base" weight="bold">
                {t("contracts")}
              </Typography>
            </motion.div>
            <motion.div
              className="p-6 overflow-x-auto"
              variants={tableVariants}
            >
              <ContractTable
                data={[
                  {
                    id: 1,
                    signedBy: "John Smith",
                    position: "Project Manager",
                    amountByContract: 150000,
                    organization: "Tech Solutions Inc.",
                    dateCreated: "2024-01-15",
                    noOfRequest: 12,
                    contract_id: "CTR-2024-001",
                  },
                  {
                    id: 2,
                    signedBy: "Sarah Johnson",
                    position: "Senior Developer",
                    amountByContract: 85000,
                    organization: "Digital Innovations Ltd.",
                    dateCreated: "2024-01-20",
                    noOfRequest: 8,
                    contract_id: "CTR-2024-002",
                  },
                  {
                    id: 3,
                    signedBy: "Michael Brown",
                    position: "Business Analyst",
                    amountByContract: 120000,
                    organization: "Global Systems Corp.",
                    dateCreated: "2024-01-25",
                    noOfRequest: 15,
                    contract_id: "CTR-2024-003",
                  },
                ]}
              />
            </motion.div>
          </motion.div>

          {/* <motion.div
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
              <AddressTable data={addressData} />
            </motion.div>
          </motion.div> */}

          {/* <motion.div
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
            <div className="flex justify-end gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="primary"
                  className="flex items-center justify-center w-fit gap-2 py-2 px-4 sm:py-3"
                  onClick={() => navigate(`/add-request/${projectId}`)}
                >
                  <WhitePlusIcon width={13} height={13} />
                  <Typography size="base">{t("create_request")}</Typography>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="mt-4 sm:mt-6 overflow-x-auto min-h-[230px]"
              variants={itemVariants}
            >
              <RequestTable data={requestData} />
            </motion.div>
          </motion.div> */}

          {/* <motion.div
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
          </motion.div> */}

          {/* <motion.div
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
          </motion.div> */}
        </div>
      </>
    </div>
  );
};

export default ProjectDetails;
