import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AppLayout from "../../layout/AppLayout";
import Button from "../../lib/components/atoms/Button";
import DashBoardCard from "../../lib/components/molecules/DashBoardCard.tsx";
import {
  ArchiveIcon,
  FileVioletIcon,
  FilterIcon,
  SearchIcon,
  UsdGreenIcon,
  UsdOrangeIcon,
  UsdVioletIcon,
  WhitePlusIcon,
} from "../../icons";
import Typography from "../../lib/components/atoms/Typography.tsx";
import Input from "../../lib/components/atoms/Input.tsx";
import ListDashBoardTable, { Data } from "../table/ListDashboardTable.tsx";

const initialData: Data[] = [
  {
    id: 1,
    projectId: "#25-00001",
    projectName: "Renovation Project",
    currency: "USD",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
  {
    id: 2,
    projectId: "#25-00002",
    projectName: "Renovation Project",
    currency: "USD",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
  {
    id: 3,
    projectId: "#25-00003",
    projectName: "Renovation Project",
    currency: "USD",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
  {
    id: 4,
    projectId: "#25-00001",
    projectName: "Renovation Project",
    currency: "CDF",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
  {
    id: 5,
    projectId: "#25-00001",
    projectName: "Renovation Project",
    currency: "USD",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
  {
    id: 6,
    projectId: "#25-00001",
    projectName: "Renovation Project",
    currency: "CDF",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
  {
    id: 7,
    projectId: "#25-00001",
    projectName: "Renovation Project",
    currency: "USD",
    amount: 123,
    createdDate: "24/20/2001",
    noOfRequest: 2,
  },
];

// Animation variants for staggered card animation
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ListDashBoard = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <motion.div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Typography
          size="xl_2"
          weight="extrabold"
          className="text-secondary-100 mb-4 sm:mb-0"
        >
          {t("dashboard")}
        </Typography>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="primary"
            className="flex items-center justify-center w-fit gap-2 py-2 px-4 sm:py-3"
          >
            <WhitePlusIcon width={13} height={13} />
            <Typography size="base">{t("create_project")}</Typography>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            icon: (
              <FileVioletIcon
                width={36}
                height={36}
                className="sm:w-11 sm:h-11"
              />
            ),
            count: 2,
            title: t("total_entity"),
          },
          {
            icon: (
              <UsdGreenIcon
                width={36}
                height={36}
                className="sm:w-11 sm:h-11"
              />
            ),
            count: 2200,
            title: t("total_amount"),
          },
          {
            icon: (
              <UsdVioletIcon
                width={36}
                height={36}
                className="sm:w-11 sm:h-11"
              />
            ),
            count: 440,
            title: t("total_tax_amount"),
          },
          {
            icon: (
              <UsdOrangeIcon
                width={36}
                height={36}
                className="sm:w-11 sm:h-11"
              />
            ),
            count: 4840,
            title: t("total_amount_with_tax"),
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <DashBoardCard
              icon={card.icon}
              count={card.count}
              title={card.title}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="bg-white p-4 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <motion.div
            className="w-full sm:w-1/2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-50" />
              </div>
              <Input
                type="text"
                placeholder="Search By Project ID or Project Name..."
                className="pl-9 sm:pl-10 bg-white pr-4 text-sm sm:text-base w-full"
              />
            </div>
          </motion.div>
          <div className="flex gap-2 sm:gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="flex justify-center items-center gap-2 w-fit py-2 px-3 sm:py-3 sm:px-4 min-w-[100px] sm:min-w-[120px] h-fit"
              >
                <ArchiveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <Typography
                  className="text-secondary-60"
                  element="span"
                  size="sm"
                  weight="semibold"
                >
                  Archive
                </Typography>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="flex justify-center items-center gap-2 w-fit py-2 px-3 sm:py-3 sm:px-4 min-w-[100px] sm:min-w-[120px] h-fit"
              >
                <FilterIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <Typography
                  className="text-secondary-60"
                  element="span"
                  size="sm"
                  weight="semibold"
                >
                  Filter
                </Typography>
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-4 sm:mt-6 mb-5 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <ListDashBoardTable data={initialData} />
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default ListDashBoard;
