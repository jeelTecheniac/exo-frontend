import LanguageSwitchLayout from "./LanguageSwitchLayout";
import AuthLayout from "./AuthLayout";
import Features from "../../components/Features";
import SignInForm from "../../components/SignInForm";
import Typography from "../../lib/components/atoms/Typography";
import { useTranslation } from "react-i18next";
import TermsConditionModal from "../../components/modal/TermsConditionModal";
import { useModal } from "../../hooks/useModal";
import PrivacyModal from "../../components/modal/PrivacyModal";

const SignIn = () => {
  const { t } = useTranslation();

  const {
    isOpen: isTermModel,
    openModal: openTermModel,
    closeModal: closeTermModel,
  } = useModal();

  const {
    isOpen: isPrivacyModel,
    openModal: openPrivacyModel,
    closeModal: closePrivacyModel,
  } = useModal();

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openTermModel();
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openPrivacyModel();
  };
  return (
    <AuthLayout>
      <div className="flex">
        <div className="w-full">
          <div className="px-[20px] flex flex-col justify-center gap-[45px] mt-5 lg:px-[100px]">
            <LanguageSwitchLayout />
            <div>
              <SignInForm />
            </div>
            <div className="text-center mb-2 lg:mb-0">
              <Typography
                className="text-secondary-60"
                size="base"
                weight="normal"
              >
                {t("by_signing_up_to_create_an_account_i_accept_company")}
              </Typography>
              <Typography className="text-secondary-60 text-base font-normal">
                <span
                  className="text-primary-150 text-base font-normal mx-1 cursor-pointer hover:underline"
                  onClick={handleTermsClick}
                >
                  {t("terms_conditions")}
                </span>
                {t("and")}
                <span
                  className="text-primary-150 text-base font-normal mx-1 cursor-pointer hover:underline"
                  onClick={handlePrivacyClick}
                >
                  {t("privacy_policy")}
                </span>
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:block">
          <Features />
        </div>
        <TermsConditionModal isOpen={isTermModel} onClose={closeTermModel} />
        <PrivacyModal isOpen={isPrivacyModel} onClose={closePrivacyModel} />
      </div>
    </AuthLayout>
  );
};

export default SignIn;
