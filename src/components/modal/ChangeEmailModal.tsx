import { useTranslation } from "react-i18next";
import Button from "../../lib/components/atoms/Button";
import Input from "../../lib/components/atoms/Input";
import Label from "../../lib/components/atoms/Label";
import Modal from "../../lib/components/atoms/Modal";
import Password from "../../lib/components/atoms/Password";
import Typography from "../../lib/components/atoms/Typography";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeEmailModal = ({ isOpen, onClose }: ChangeEmailModalProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-fit">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isFullscreen={false}
        className="max-w-[600px] mx-auto p-6"
      >
        <Typography size="xl" weight="bold" className="text-secondary-100">
          {t("change_email")}
        </Typography>
        <Typography size="base" weight="normal" className="text-secondary-60">
          {t("enter_your_new_email_and_confirm_your_password_to_proceed")}
        </Typography>
        <div className="mt-7">
          <div>
            <Label>{t("new_email")}</Label>
            <Input placeholder={t("enter_email_address")} />
          </div>
          <div className="mt-6">
            <Label>{t("current_password")}</Label>
            <Password />
          </div>
        </div>
        <div className="w-full flex gap-4 justify-end mt-6">
          <Button
            variant="outline"
            className="w-fit !py-3"
            onClick={() => onClose()}
          >
            {t("cancel")}
          </Button>
          <Button variant="primary" className="w-fit !py-3">
            {t("send_otp")}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeEmailModal;
