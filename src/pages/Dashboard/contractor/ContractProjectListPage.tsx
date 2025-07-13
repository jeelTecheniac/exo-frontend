import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronLeftLightIcon,
  ChevronRightIcon,
  ChevronRightLightIcon,    
  FilterIcon,  
  SearchIcon,  
} from "../../../icons";
import { useNavigate } from "react-router";
import { useLoading } from "../../../context/LoaderProvider";
import homeService from "../../../services/home.service";
import AppLayout from "../../../layout/AppLayout";
import Typography from "../../../lib/components/atoms/Typography";
import Button from "../../../lib/components/atoms/Button";
import Filter from "../../../lib/components/molecules/Filter";
import ContractProjectListTable, { Data } from "../../../components/table/ContractProjectListTable";
import Input from "../../../lib/components/atoms/Input";


const projectData: Data[] = [
  {
    id: 1,
    projectId: "#25-00001",
    projectName: "Renovation Project",
    currency: "USD",
    amount: 2500000,
    createdDate: "2025/04/12",
    noOfRequest: 0,
    projectUuid: "uuid-0001",
    status: "progress",
    endDate: "2025/04/12",
    financeBy: "Robert Fox",
    projectManager: "Robert Fox"
  },
  {
    id: 2,
    projectId: "#25-00002",
    projectName: "Road Project",
    currency: "USD",
    amount: 4500000,
    createdDate: "2025/04/12",
    noOfRequest: 0,
    projectUuid: "uuid-0002",
    status: "expired",
    endDate: "2025/04/12",
    financeBy: "Justin Bevan",
    projectManager: "Justin Bevan"
  },
  {
    id: 3,
    projectId: "#25-00003",
    projectName: "Construction Project",
    currency: "USD",
    amount: 2666000,
    createdDate: "2025/04/12",
    noOfRequest: 0,
    projectUuid: "uuid-0003",
    status: "schedule",
    endDate: "2025/04/12",
    financeBy: "Bill Client",
    projectManager: "Bill Client"
  },
  {
    id: 4,
    projectId: "#25-00004",
    projectName: "Taxi Project",
    currency: "USD",
    amount: 2999000,
    createdDate: "2025/04/12",
    noOfRequest: 0,
    projectUuid: "uuid-0004",
    status: "draft",
    endDate: "2025/04/12",
    financeBy: "Mark Fox",
    projectManager: "Mark Fox"
  },
  {
    id: 5,
    projectId: "#25-00005",
    projectName: "Maintenance Project",
    currency: "USD",
    amount: 7500000,
    createdDate: "2025/04/12",
    noOfRequest: 0,
    projectUuid: "uuid-0005",
    status: "schedule",
    endDate: "2025/04/12",
    financeBy: "Nayan Patel",
    projectManager: "Nayan Patel"
  },
  {
    id: 6,
    projectId: "#25-00006",
    projectName: "Redevelopment Project",
    currency: "USD",
    amount: 2500000,
    createdDate: "2025/04/12",
    noOfRequest: 0,
    projectUuid: "uuid-0006",
    status: "progress",
    endDate: "2025/04/12",
    financeBy: "Robert Josh",
    projectManager: "Robert Josh"
  }
];





const ContractProjectListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState<Data[]>([]);
  const { setLoading } = useLoading();

  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  // Dashboard card state
  const [totalProject, setTotalProject] = useState(0);
  const [totalAmountProject, setTotalAmountProject] = useState(0);
  // const [setTotalRequest] = useState(0);
  const [totalAmountRequest, setTotalAmountRequest] = useState(0);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [range, setRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const datePickerRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
    //   setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const formateDate = (date: Date | null) => {
    if (!date) return;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;    
    return formattedDate;
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await homeService.getHomeData(
          limit,
          offset,
          debouncedSearchTerm,
          formateDate(range.startDate),
          formateDate(range.endDate)
        );
        const dataArray = (res.data || []).map((item: any, idx: number) => ({
          id: idx + 1 + offset,
          projectId: item.reference,
          projectName: item.name,
          currency: item.currency,
          amount: Number(item.amount),
          createdDate: item.created_at,
          noOfRequest: item.requests_count || 0,
          projectUuid: item.id,
          status: item.status,
          endDate: item.end_date,
          financeBy: item.finance_by,
        }));

        setData(dataArray);
        setTotal(res.total_project || 0);
        setTotalProject(res.total_project || 0);
        setTotalAmountProject(res.total_amount_project || 0);        
        setTotalAmountRequest(res.total_amount_request || 0);

        if (res.total_project <= 0) {
          navigate("/");
        }
      } catch (e) {
        console.log(e, "error");
        setData([]);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    // fetchData();
    setData(projectData)
  }, [limit, offset, navigate, debouncedSearchTerm, range]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * limit;
    setOffset(newOffset);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0); // Reset to first page when changing limit
  };

  const handleApplyDateFilter = (newRange: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    // setRange(newRange);
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppLayout>
      <div className={"relative"}>
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4 px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography
            size="xl"
            weight="extrabold"
            className="text-secondary-100 text-center sm:text-left"
          >
            {t("select_project_to_continue")}
          </Typography>          
        </motion.div>

        <motion.div className="px-4 sm:px-0">
          <motion.div
            className="bg-white p-3 sm:p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4 mb-4 sm:mb-5">
              <motion.div
                className="w-full sm:w-1/2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-2.5 sm:left-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-50" />
                  </div>
                  <Input
                    type="text"
                    placeholder={t("Search By Project ID or Project Name...")}
                    className="pl-8 sm:pl-10 bg-white pr-3 sm:pr-4 text-sm sm:text-base w-full h-9 sm:h-10"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div>

              <div className="flex gap-2 sm:gap-3 justify-end relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >                  
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className="flex justify-center items-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2.5 sm:px-4 min-w-[90px] sm:min-w-[120px] h-9 sm:h-10"
                    onClick={() => setIsDatePickerOpen(true)}
                  >
                    <FilterIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    <Typography
                      className="text-secondary-60"
                      element="span"
                      size="sm"
                      weight="semibold"
                    >
                      {t("Filter")}
                    </Typography>
                  </Button>
                </motion.div>
                {isDatePickerOpen && (
                  <div
                    ref={datePickerRef}
                    className="absolute top-[100%] right-0 w-max z-50 mt-2 bg-white border border-secondary-30 rounded-lg shadow-lg p-4"
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

            <div className="sm:mx-0 overflow-x-auto">              
              <ContractProjectListTable data={data} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 px-4 sm:px-0">
              <div className="flex items-center gap-2 text-sm">
                <span>Rows per page:</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm bg-white"
                >
                  {[8, 16, 32].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Button
                  variant="outline"
                  className="px-2 py-1 min-w-[32px] border-0 disabled:text-gray-400"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {currentPage === 1 ? (
                    <ChevronLeftLightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </Button>
                <div>
                  <span className="text-nowrap">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="px-2 py-1 min-w-[32px] border-0"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {currentPage === totalPages ? (
                    <ChevronRightLightIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}

export default ContractProjectListPage