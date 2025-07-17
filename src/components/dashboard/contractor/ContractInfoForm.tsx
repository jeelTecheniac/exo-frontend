import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import UploadFile, { UploadedFile } from "../../common/UploadFile";
import Label from "../../../lib/components/atoms/Label";
import Input from "../../../lib/components/atoms/Input";
import CurrencyInput from "../../../lib/components/atoms/CurrencyInput";
import DatePicker from "../../../lib/components/atoms/DatePicker";
import { ArrowRightIconButton, CDFFlag, USFlag } from "../../../icons";
import Button from "../../../lib/components/atoms/Button";
import Typography from "../../../lib/components/atoms/Typography";

interface ContractFormValues {
  signedBy: string;
  position: string;
  // projectManager: string;
  organization: string;
  amount: string;
  currency: string;
  dateOfSigning: string;
  place:string;
  contractFiles: UploadedFile[];
}

interface StepProps {
  initialValues?: ContractFormValues;
  onSubmit: (values: ContractFormValues) => void;
}

const ContractInfoForm = ({ initialValues, onSubmit }: StepProps) => {
  const { t } = useTranslation();

  const defaultValues: ContractFormValues = {
    signedBy: "",
    position: "",
    // projectManager: "",
    organization: "",
    amount: "",
    currency: "USD",
    dateOfSigning: "",
    contractFiles: [],
    place:""
  };

  const currencyOptions = [
    {
      value: "USD",
      label: "USD",
      flag: <USFlag className="w-5 h-4" />,
    },
    {
      value: "CDF",
      label: "CDF",
      flag: <CDFFlag className="w-5 h-4" />,
    },
  ];

  const validationSchema = Yup.object().shape({
    signedBy: Yup.string().required("Signed By is required"),
    position: Yup.string().required("Position is required"),
    // projectManager: Yup.string().required("Project Manager is required"),
    organization: Yup.string().required("Organization is required"),
    amount: Yup.string().required("Amount is required"),
    place: Yup.string().required("Place is required"),
    dateOfSigning: Yup.string().required("Date is required"),
  });

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="space-y-5">
          <div className="mb-6">
            <Typography
              size="lg"
              weight="semibold"
              className="text-secondary-100">
              {t("contract_info")}
            </Typography>
            <Typography
              size="base"
              weight="normal"
              className="text-secondary-60">
              {t("contract_info_description")}
            </Typography>
          </div>
          <div>
            <Label htmlFor="signedBy">
              Signed By <span className="text-red-500">*</span>
            </Label>
            <Field
              id="signedBy"
              as={Input}
              name="signedBy"
              placeholder="John Doe"
            />
            <ErrorMessage
              name="signedBy"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex gap-5 w-full">
            <div className="w-full">
              <Label htmlFor="position">
                Position <span className="text-red-500">*</span>
              </Label>
              <Field
                as={Input}
                id="position"
                name="position"
                placeholder="Project Manager"
              />
              <ErrorMessage
                name="position"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="amount">
                Amount <span className="text-red-500">*</span>
              </Label>
              <CurrencyInput
                id="amount"
                options={currencyOptions}
                value={values.amount}
                currency={values.currency}
                onChange={(amount: string, currency: string) => {
                  setFieldValue("amount", amount);
                  setFieldValue("currency", currency);
                }}
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* <div>
            <Label htmlFor="projectManager">
              Project Manager <span className="text-red-500">*</span>
            </Label>
            <Field
              as={Input}
              id="projectManager"
              name="projectManager"
              placeholder="Robert Fox"
            />
            <ErrorMessage
              name="projectManager"
              component="div"
              className="text-red-500 text-sm"
            />
          </div> */}

          <div>
            <Label htmlFor="organization">
              Organization <span className="text-red-500">*</span>
            </Label>
            <Field
              as={Input}
              name="organization"
              id="organization"
              placeholder="ABC Corporation Ltd."
            />
            <ErrorMessage
              name="organization"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="place">
              Place <span className="text-red-500">*</span>
            </Label>
            <Field
              as={Input}
              name="place"
              id="place"
              placeholder="Frace"
            />
            <ErrorMessage
              name="place"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="dateOfSigning">
              Date of Signing <span className="text-red-500">*</span>
            </Label>
            <DatePicker
              id="dateOfSigning"
              defaultDate={
                values.dateOfSigning
                  ? new Date(values.dateOfSigning)
                  : undefined
              }
              onChange={(selectedDates: Date[]) => {
                if (selectedDates[0]) {
                  const day = selectedDates[0]
                    .getDate()
                    .toString()
                    .padStart(2, "0");
                  const month = (selectedDates[0].getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = selectedDates[0].getFullYear();
                  const formattedDate = `${day}-${month}-${year}`;
                  setFieldValue("dateOfSigning", formattedDate);
                }
              }}
              placeholder="2025-07-13"
              error={
                touched.dateOfSigning && errors.dateOfSigning
                  ? errors.dateOfSigning
                  : false
              }
            />
          </div>

          <div>
            <Label>Upload Files</Label>
            <UploadFile
              files={values.contractFiles}
              onFilesSelect={(files) => setFieldValue("contractFiles", files)}
              onUploadFile={async (file, onProgress) => {
                return new Promise((res) => {
                  setTimeout(() => {
                    onProgress(100);
                    res({
                      id: Date.now().toString(),
                      url: URL.createObjectURL(file),
                    });
                  }, 800);
                });
              }}
              onDeleteFile={async (id) => {
                const updated = values.contractFiles.filter((file) => file.id !== id);
                setFieldValue("files", updated);
                return { status: true };
              }}
              maxSize={5}
              acceptedFormats={[".pdf", ".doc"]}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              type="submit"
              //   form="project-form"
              className="px-6 py-3 bg-primary-150 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-200 w-full md:w-auto">
              {t("next")}
              <ArrowRightIconButton
                width={18}
                height={18}
                className="text-white"
              />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContractInfoForm;
