import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Typography from "../../../lib/components/atoms/Typography";
import Button from "../../../lib/components/atoms/Button";
import ProjectInfoForm from "../ProjectInfoForm";
import {
  ArrowLeftIcon,
  ArrowRightIconButton,
  SaveDraftIcon,
} from "../../../icons";
import { useModal } from "../../../hooks/useModal";
import CreateProjectConfirmationModal from "../../modal/CreateProjectConfirmationModal";
import { UploadedFile } from "../../common/UploadFile";

interface ProjectFormValues {
  projectName: string;
  financeBy: string;
  projectReference: string;
  amount: string;
  currency: string;
  beginDate: string;
  endDate: string;
  description: string;
  addresses: Array<{
    id: number;
    country: string;
    province: string;
    city: string;
    municipality: string;
  }>;
  files: UploadedFile[];
}

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();

  const handleSubmit = (values: ProjectFormValues) => {
    console.log("Form submitted with values:", values);
    // Here you would typically make an API call to create the project
    // For now, we'll just show the confirmation modal
    openModal();
  };

  const handleSaveDraft = () => {
    console.log("Save draft button clicked");
    // This will be handled by the form's onSaveDraft prop
  };

  return (
    <div className="bg-secondary-5 h-full p-4 md:p-6">
      <div className="max-w-[900px] mx-auto">
        <div className="rounded-lg overflow-hidden bg-white shadow-md border border-gray-100">
          <div className="h-1 w-full bg-primary-150"></div>
          <div className="p-4 md:p-6">
            <div
              className="flex items-center gap-2 cursor-pointer mb-2"
              onClick={() => navigate("/project-home")}
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

            <Typography size="xl" weight="bold" className="text-secondary-100">
              {t("create_request")}
            </Typography>
          </div>
          <div className="h-[1px] w-full bg-gray-200"></div>

          <div className="p-4 md:p-6">
            <ProjectInfoForm onSubmit={handleSubmit} />

            <div className="flex flex-col-reverse md:flex-row justify-end gap-4 mt-8">
              <Button
                variant="secondary"
                onClick={handleSaveDraft}
                className="px-6 py-3 bg-white rounded-lg text-primary-150 font-medium flex items-center justify-center gap-2 shadow-md hover:bg-gray-50 w-full md:w-auto"
              >
                <SaveDraftIcon
                  width={20}
                  height={20}
                  className="text-primary-150"
                />
                {t("save_as_draft")}
              </Button>

              <Button
                variant="primary"
                type="submit"
                form="project-form"
                className="px-6 py-3 bg-primary-150 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-200 w-full md:w-auto"
              >
                {t("submit")}
                <ArrowRightIconButton
                  width={18}
                  height={18}
                  className="text-white"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CreateProjectConfirmationModal
        isOpen={isOpen}
        onClose={closeModal}
        projectId=""
      />
    </div>
  );
};

export default CreateProjectForm;
