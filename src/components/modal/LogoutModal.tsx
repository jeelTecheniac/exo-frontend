import { useNavigate } from "react-router";
import { ExitIcon } from "../../icons";
import Button from "../../lib/components/atoms/Button";
import Modal from "../../lib/components/atoms/Modal";
import Typography from "../../lib/components/atoms/Typography";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: ChangeEmailModalProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-fit">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isFullscreen={false}
        className="max-w-[600px] mx-auto p-6 max-h-[500px]"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <ExitIcon width={80} height={80} />
          <Typography
            size="xl"
            weight="bold"
            className="text-secondary-100 mt-4"
          >
            Are you sure want to logout?
          </Typography>
          <Typography
            size="base"
            weight="normal"
            className="text-secondary-60 mt-2"
          >
            Logout of ExoTrack as pratik@mailinator.com?
          </Typography>

          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="w-fit py-3" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="w-fit py-3"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogoutModal;
