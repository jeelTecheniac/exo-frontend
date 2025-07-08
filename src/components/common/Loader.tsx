import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const body = document.body;

    // Disable scroll and pointer events
    body.style.overflow = "hidden";
    body.style.pointerEvents = "none";

    return () => {
      // Cleanup on unmount
      body.style.overflow = "";
      body.style.pointerEvents = "";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <span className="text-lg sm:text-xl font-semibold text-primary-150">
        {t("Loading...")}
      </span>
    </div>
  );
};

export default Loader;
