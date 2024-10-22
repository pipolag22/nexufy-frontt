import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button onClick={toggleLanguage} className="btn btn-secondary me-2">
      {language === "es" ? "EN" : "ES"}
    </button>
  );
};

export default LanguageToggle;
