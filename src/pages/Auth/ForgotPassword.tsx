import LanguageSwitchLayout from "./LanguageSwitchLayout";
import AuthLayout from "./AuthLayout";
import Features from "../../components/Features";
import Typography from "../../lib/components/atoms/Typography";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <AuthLayout>
      <div className="flex">
        <div className="w-full">
          <div className="px-[20px] flex flex-col justify-center gap-10  mt-5 lg:px-[100px]">
            <LanguageSwitchLayout />
            <div>
              <ForgotPasswordForm />
            </div>
            <div className="text-center mb-2 lg:mb-0">
              <Typography
                className="text-secondary-60"
                size="base"
                weight="normal"
              >
                {t("by_signing_up_to_create_an_account_i_accept_company")}
              </Typography>
              <span className="text-primary-150 text-base font-semibold cursor-pointer">
                {t("terms_of_use_privacy_policy")}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:block">
          <Features />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
