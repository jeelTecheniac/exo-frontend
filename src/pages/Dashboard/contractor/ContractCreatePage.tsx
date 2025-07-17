import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../../../layout/AppLayout";
import Stepper from "../../../components/common/Stepper";
import { useModal } from "../../../hooks/useModal";
import { ArrowLeftIcon, ArrowRightIconButton } from "../../../icons";
import Typography from "../../../lib/components/atoms/Typography";
import Button from "../../../lib/components/atoms/Button";
import ContractInfoForm from "../../../components/dashboard/contractor/ContractInfoForm";
import ContractReviewForm from "../../../components/dashboard/contractor/ContractReviewForm";
import CreateContractConfirmationModal from "../../../components/modal/CreateContractConfirmationModal";
import projectService from "../../../services/project.service";
import { UploadedFile } from "../../../components/common/UploadFile";
import { useLoading } from "../../../context/LoaderProvider";
import { useMutation } from "@tanstack/react-query";
import contractService from "../../../services/contract.service";
import moment from "moment";
interface Address {
  id: string;
  country?: string;
  providence?: string;
  city?: string;
  municipality?: string;
}

export interface ContractReviewData {
  projectName:string;
  reference:string;
  projectAmount:string;
  projectCurrency:string;
  signedBy: string;
  position: string;
  beginDate:string;
  endDate:string;
  description:string;
  projectFiles:UploadedFile[];
  address:Address[];
  // projectManager: string;
  organization: string;
  amount: string;
  currency: string;
  dateOfSigning: string;
  contractFiles: UploadedFile[];
  place:string
}

const ContractReviewInitialValue ={
  projectName:"",
  reference:"",
  projectAmount:"",
  projectCurrency:"",
  signedBy: "",
  position: "",
  beginDate:"",
  endDate:"",
  description:"",
  projectFiles:[],
  address:[],
  // projectManager: "",
  organization: "",
  amount: "",
  currency: "",
  dateOfSigning: "",
  contractFiles: [],
  place:"",
}

interface FormDataProps {
  signedBy: string,
  position: string,
  // projectManager: string,
  organization: string,
  amount: string,
  currency: string,
  dateOfSigning: string,
  contractFiles: UploadedFile[],
  place:string
};

const initialValue = {
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

const ContractCreatePage = () => {  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataProps| undefined>(initialValue);
  const [contractReview,setContractReview]=useState<ContractReviewData>(ContractReviewInitialValue);

  const { projectId } = useParams();
  const {setLoading}=useLoading()

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
    setContractReview((preve)=>({...preve,...values}))
    setFormData(values);
    setCurrentStep(1);
  };

  const contractCreateMutation=useMutation({
    mutationFn:async(data:any)=>{
      let payload=new FormData()
      payload.append("signed_by",data.signedBy)
      payload.append("position",data.position)
      payload.append("currency",data.currency);
      payload.append("amount",data.amount);
      payload.append("organization",data.organization);
      payload.append("place",data.place);
      payload.append("date_of_signing",moment(data.dateOfSigning,"DD-MM-YYYY").format("YYYY-MM-DD"));
      payload.append("document_ids",data.contractFiles.join(","))
      if(projectId){
        payload.append("project_id",projectId)
      }      
      const response=await contractService.creteContract(payload);
      return response.data
    },onSuccess:async(data)=>{
      openModal()
    },onError:(error)=>{console.error(error);
    }
  })

  const handleFinalSubmit = () => {    
    contractCreateMutation.mutate(formData)
    // openModal();
  };

  useEffect(() => {
    const fetchProject = async () => {      
      try {
        setLoading(true)
        const data = await projectService.getProjectDetails(projectId!);                        
        const project=data.data
        setContractReview((preve) => ({
          ...preve,
          projectAmount: project.amount,
          projectName: project.name,
          currency: project.currency,
          beginDate: project.begin_date,
          endDate: project.end_date,
          description: project.description,
          projectFiles:project.documents,
          reference:project.reference,
          address: project.address.map((address: Address, index: number) => ({
            id: index + 1,
            city: address.city,
            providence: address.providence,
            municipality: address.municipality,
            country: address.country,
          })),
        }));
      } catch (err: any) {
        console.error(err, "erro");        
      } finally {        
        setLoading(false)
      }
    };
    if (projectId) fetchProject();
  }, [projectId, t]);  

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
                      projectData={contractReview}                
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
