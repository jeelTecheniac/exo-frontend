import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
  FileVioletIcon,
  PlusBlueIcon,
  UsdGreenIcon,
  UsdOrangeIcon,
  UsdVioletIcon,
} from "../../icons";
import Input from "../../lib/components/atoms/Input";
import Label from "../../lib/components/atoms/Label";
import TextEditor from "../../lib/components/atoms/TextEditor";
import Typography from "../../lib/components/atoms/Typography";
import DashBoardCard from "../../lib/components/molecules/DashBoardCard";
import UploadFile from "../common/UploadFile";
import CreateRequestTable, { Order } from "../table/CreateRequestTable.tsx";
import Button from "../../lib/components/atoms/Button";
import { useState } from "react";
import AppLayout from "../../layout/AppLayout.tsx";

const initialTableData: Order[] = [
  {
    id: 1,
    label: "iPhone",
    quantity: 2,
    unitPrice: 1000,
    total: 2000,
    taxRate: 10,
    taxAmount: 200,
    vatIncluded: 2200,
    financialAuthority: "DGDA",
  },
  {
    id: 2,
    label: "iPhone",
    quantity: 2,
    unitPrice: 1000,
    total: 2000,
    taxRate: 10,
    taxAmount: 200,
    vatIncluded: 2200,
    financialAuthority: "DGDA",
  },
];

const AddRequest = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(initialTableData);

  const handleAddEntity = () => {
    const newOrder: Order = {
      id: data.length + 1,
      label: "New Item",
      quantity: 1,
      unitPrice: 0,
      total: 0,
      taxRate: 0,
      taxAmount: 0,
      vatIncluded: 0,
      financialAuthority: "DGDA",
    };
    setData([...data, newOrder]);
  };

  return (
    <AppLayout className="bg-white">
      <div className="px-4 md:px-0">
        <div
          className="flex items-center gap-2 cursor-pointer mb-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeftIcon width={16} height={16} className="text-primary-150" />
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
          className="text-secondary-100 text-2xl md:text-3xl"
        >
          {t("create_request")}
        </Typography>

        {/* Form Fields */}
        <div className="mt-4 md:mt-6">
          <Label htmlFor="address">{t("address")}</Label>
          <Input
            type="text"
            id="address"
            name="address"
            placeholder={t("enter_address")}
            className="w-full"
          />
        </div>

        <div className="mt-4 md:mt-6">
          <Label htmlFor="requestLetter">{t("request_letter")}</Label>
          <TextEditor
            placeholder="Write here..."
            maxLength={100}
            // className="min-h-[120px] md:min-h-[150px]"
          />
        </div>

        {/* Add Entity Button */}
        <div className="mb-3 md:mb-5 flex justify-end">
          <Button
            variant="secondary"
            className="flex items-center w-full md:w-fit gap-1 py-2 mt-4 justify-center"
            onClick={handleAddEntity}
          >
            <PlusBlueIcon />
            <Typography>{t("add_entity")}</Typography>
          </Button>
        </div>

        {/* Entity Section */}
        <div>
          <Typography size="base" weight="normal" className="text-secondary-60">
            {t("entity")}
          </Typography>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-3 md:mt-5">
            <DashBoardCard
              icon={<FileVioletIcon width={44} height={44} />}
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

          {/* Table Section */}
          <div className="mt-3 md:mt-5 mb-2 overflow-x-auto">
            <CreateRequestTable data={data} onDataChange={setData} />
          </div>

          {/* Upload Section */}
          <div>
            <div className="mt-5 md:mt-7 mb-4 md:mb-6">
              <Label>{t("invoice_files")}</Label>
              <UploadFile
                maxSize={10}
                acceptedFormats={[".pdf", ".doc", ".txt", ".ppt"]}
                // className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="mb-3 md:mb-5 flex justify-end">
          <Button
            variant="primary"
            className="flex items-center w-full md:w-fit gap-1 py-2 mt-4 justify-center"
          >
            {t("submit_request")}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddRequest;
