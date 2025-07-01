import { EnglishBanner, FrenchBanner } from "../icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Features = () => {
  const { i18n } = useTranslation();

  return (
    <div className="h-screen flex items-center justify-end py-4 pr-4 rounded-lg w-full">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {i18n.language === "en" ? (
          <EnglishBanner className="w-full h-full object-cover" />
        ) : (
          <FrenchBanner className="w-full h-full" />
        )}
      </motion.div>
    </div>
  );
};

export default Features;
