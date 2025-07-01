import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";
import Button from "../../lib/components/atoms/Button";
import Password from "../../lib/components/atoms/Password";
import Typography from "../../lib/components/atoms/Typography";
import ChangeEmailModal from "../modal/ChangeEmailModal";
import VerifyOtpModal from "../modal/VerifyOtpModal";

const Security = () => {
  const { t } = useTranslation();
  const {
    isOpen: isOpenEmailModal,
    openModal: openEmailModal,
    closeModal: closeEmailModal,
  } = useModal();

  const {
    isOpen: isOpenOtpModal,
    openModal: openOtpModal,
    closeModal: closeOtpModal,
  } = useModal();

  return (
    <div className="w-full flex gap-4 md:gap-6 flex-col">
      <div className="bg-white p-4 md:p-6 lg:p-10">
        <Typography
          size="xl_2"
          weight="extrabold"
          className="text-secondary-100"
        >
          {t("email_address")}
        </Typography>
        <div className="mt-6">
          <Typography size="base" weight="normal" className="text-secondary-60">
            {t("current_email")}
          </Typography>
          <Typography
            size="base"
            weight="normal"
            className="text-secondary-100"
          >
            robert.anderson@example.com
          </Typography>
        </div>
        <Button
          variant="primary"
          className="w-full md:w-fit mt-6 !py-3"
          onClick={openEmailModal}
        >
          {t("change_email")}
        </Button>
      </div>
      <div className="bg-white p-4 md:p-6 lg:p-10">
        <Typography
          size="xl_2"
          weight="extrabold"
          className="text-secondary-100"
        >
          {t("change_password")}
        </Typography>
        <div className="mt-6">
          <Password
            labelProps={{
              children: "Current Password",
            }}
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-6 w-full">
          <div className="w-full">
            <Password
              className="w-full"
              labelProps={{
                children: t("new_password"),
              }}
            />
          </div>
          <div className="w-full">
            <Password
              labelProps={{
                children: t("confirm_password"),
              }}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="primary"
            className="w-full md:w-fit !py-3"
            onClick={openOtpModal}
          >
            {t("update_password")}
          </Button>
        </div>
      </div>
      <ChangeEmailModal isOpen={isOpenEmailModal} onClose={closeEmailModal} />
      <VerifyOtpModal isOpen={isOpenOtpModal} onClose={closeOtpModal} />
    </div>
  );
};

export default Security;
