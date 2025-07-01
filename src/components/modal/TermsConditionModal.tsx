import Button from "../../lib/components/atoms/Button";
import Modal from "../../lib/components/atoms/Modal";
import Typography from "../../lib/components/atoms/Typography";

interface TermsConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

const policyData = {
  lastUpdated: "May 10, 2025",
  sections: [
    {
      title: "Overview",
      content: `Welcome to ExoTrack ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your access to and use of our website (www.exotrack.com) ("Website"), including any features, content, tools, and services provided via the Website related to tax filing, tax advice, or financial information (collectively, the "Services").

By accessing or using ExoTrack, you agree to be bound by these Terms. If you do not agree with any part of the Terms, you must not use our Website.`,
    },
    {
      title: "1. Use of the Website",
      content: `• You must be at least 18 years old and capable of entering into a legally binding agreement to use this Website.

• You agree to use the Website for lawful purposes only and not to violate any local, national, or international laws.

• You are responsible for ensuring the accuracy of any information you provide.`,
    },
    {
      title: "2. Tax Information and Disclaimer",
      content: `• ExoTrack provides tools and information to assist with tax filing and related services.

• All content is provided for general informational purposes only and does not constitute legal, financial, or tax advice.

• We recommend consulting a certified tax professional for personalized guidance.`,
    },
    {
      title: "3. Account Registration",
      content: "You may need to create an account to access certain features.",
    },
  ],
};

const TermsConditionModal = ({
  isOpen,
  onClose,
  onAccept,
}: TermsConditionModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isFullscreen={false}
      className="max-w-[1000px] mx-auto"
    >
      <div className="flex flex-col h-[650px] px-[32px]">
        {/* Header */}
        <div className="py-4">
          <Typography size="xl" weight="bold" className="text-secondary-100">
            Terms and Condition
          </Typography>
          <Typography size="sm" weight="normal" className="text-secondary-60">
            <span>Last Updated: </span>
            <span>{policyData.lastUpdated}</span>
          </Typography>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-6">
            {policyData.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <Typography
                  size="base"
                  weight="bold"
                  className="text-secondary-100"
                >
                  {section.title}
                </Typography>
                <Typography
                  size="sm"
                  weight="normal"
                  className="text-secondary-60 whitespace-pre-line"
                >
                  {section.content}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 pr-0 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 w-fit"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onAccept?.();
              onClose();
            }}
            className="px-6 py-2 w-fit"
          >
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TermsConditionModal;
