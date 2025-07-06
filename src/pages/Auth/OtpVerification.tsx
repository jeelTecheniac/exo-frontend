import LanguageSwitchLayout from "./LanguageSwitchLayout";
import AuthLayout from "./AuthLayout";
import Features from "../../components/Features";
import OtpVerificationForm from "../../components/OtpVerificationForm";

const OtpVerification = () => {
  return (
    <AuthLayout>
      <div className="flex">
        <div className="w-full">
          <div className="px-[20px] flex flex-col justify-center gap-10  mt-5 lg:px-[100px]">
            <LanguageSwitchLayout />
            <div>
              <OtpVerificationForm />
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

export default OtpVerification;
