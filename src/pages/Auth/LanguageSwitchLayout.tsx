import { useTranslation } from "react-i18next";
import { EnglishFlag, FrenchFlagIcon } from "../../icons";
import LanguageSelector from "../../lib/components/atoms/LanguageSelector";

const LanguageSwitchLayout = () => {
  const { i18n } = useTranslation();
  const languages = [
    {
      code: "en",
      name: "English",
      Icon: EnglishFlag,
    },
    {
      code: "fr",
      name: "French",
      Icon: FrenchFlagIcon,
    },
  ];

  return (
    <div>
      <LanguageSelector
        languages={languages}
        onLanguageChange={(e) => {
          i18n.changeLanguage(e.code);
        }}
      />
    </div>
  );
};

export default LanguageSwitchLayout;
