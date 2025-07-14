import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../../../layout/AppLayout";
import Stepper from "../../../components/common/Stepper";
import { useModal } from "../../../hooks/useModal";
import { ArrowLeftIcon, ArrowRightIconButton } from "../../../icons";
import Typography from "../../../lib/components/atoms/Typography";
import Button from "../../../lib/components/atoms/Button";
import ContractInfoForm from "../../../components/dashboard/contractor/ContractInfoForm";
import ContractReviewForm from "../../../components/dashboard/contractor/ContractReviewForm";
import CreateContractConfirmationModal from "../../../components/modal/createContractConfirmationModal";


const initialValue = {
  signedBy: "",
  position: "",
  projectManager: "",
  organization: "",
  amount: "",
  currency: "USD",
  dateOfSigning: "",
  contractFiles: [],
};

const ContractCreatePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialValue);

  const steps = [
    { id: 1, title: "Contract Info" },
    { id: 2, title: "Review" },
  ];

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleFormSubmit = (values:any) => {
    setFormData(values);
    setCurrentStep(1);
  };

  const handleFinalSubmit = () => {
    console.log("Final Submitted Data:", formData);
    openModal();
  };

  return (
    <AppLayout>
      <div className="bg-secondary-5 h-full p-4 md:p-6">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-lg overflow-hidden bg-white shadow-md border border-gray-100">
            <div className="h-1 w-full bg-primary-150"></div>
            <div className="p-4 md:p-6">
              <div
                className="flex items-center gap-2 cursor-pointer mb-2"
                onClick={() => navigate("/project-home")}
              >
                <ArrowLeftIcon width={16} height={16} className="text-primary-150" />
                <Typography size="base" weight="semibold" className="text-primary-150">
                  {t("back_to_dashboard")}
                </Typography>
              </div>

              <Typography size="xl" weight="bold" className="text-secondary-100">
                {t("create_contract")}
              </Typography>
            </div>
            <div className="h-[1px] w-full bg-gray-200">
            </div>
            <div className="p-4 md:p-6">
              <Stepper variant="outline" steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
              {currentStep === 0 && (
                <ContractInfoForm initialValues={formData} onSubmit={handleFormSubmit} />
              )}

              {currentStep === 1 && (
                <>
                    <ContractReviewForm
                    projectData={formData}                
                    />
                    <div className="flex justify-end pt-4">
                    <Button
                    variant="primary"
                    type="submit"
                    onClick={handleFinalSubmit}
                    //   form="project-form"
                    className="px-6 py-3 bg-primary-150 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-200 w-full md:w-auto">
                    {t("sunmit")}
                    <ArrowRightIconButton
                        width={18}
                        height={18}
                        className="text-white"
                    />
                    </Button>
                </div>
                </>
              )}
           
            </div>
          </div>
        </div>
        <CreateContractConfirmationModal
          isOpen={isOpen}
          onClose={closeModal}
          projectId=""
        />
      </div>
    </AppLayout>
  );
};

export default ContractCreatePage;
