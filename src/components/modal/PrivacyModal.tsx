import { useQuery } from "@tanstack/react-query";
import Button from "../../lib/components/atoms/Button";
import Modal from "../../lib/components/atoms/Modal";
import Typography from "../../lib/components/atoms/Typography";
import termsService from "../../services/terms.service";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TermsConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

interface PolicySection {
  title: string;
  content: string;
}

interface PolicyData {
  lastUpdated: string;
  sections: PolicySection[];
}

const PrivacyModal = ({
  isOpen,
  onClose,
  onAccept,
}: TermsConditionModalProps) => {
  const { i18n } = useTranslation();
  const [policyData, setPolicyData] = useState<PolicyData>();

  // Fetch terms data from API
  const { data, isLoading, error } = useQuery({
    queryKey: ["privacy", i18n.language],
    queryFn: () => {
      const lang=i18n.language ==="en-US" ||  i18n.language ==="en"? "en" :"fr"
      return termsService.getPrivacy(lang);
    },
    enabled: isOpen,
  });

  // Update policy data when API data is received
  useEffect(() => {
    if (data) {
      const transformedData: PolicyData = {
        lastUpdated: data.lastUpdated || "May 10, 2025",
        sections: data.sections ||
          data.content || [
            {
              title: "Privacy Policy",
              content: typeof data === "string" ? data : JSON.stringify(data),
            },
          ],
      };

      setPolicyData(transformedData);
    }
  }, [data]);

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
            Privacy
          </Typography>
          <Typography size="sm" weight="normal" className="text-secondary-60">
            <span>Last Updated: </span>
            <span>{policyData?.lastUpdated}</span>
          </Typography>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Typography size="base" className="text-secondary-60">
                Loading privacy...
              </Typography>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <Typography size="base" className="text-red-600">
                Failed to load privacy. Showing default content.
              </Typography>
            </div>
          ) : (
            <div className="space-y-6">
              {policyData?.sections.map((section, index) => (
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
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 pr-0 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 w-fit"
            disabled={isLoading}
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
            disabled={isLoading}
          >
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PrivacyModal;
