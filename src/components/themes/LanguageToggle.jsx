import React, { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import spanish from "../../assets/img/spanish.svg"
import english from "../../assets/img/english.svg"

const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button onClick={toggleLanguage} style={{border:"none"}} className="me-3">
      {language === "es" ? <img src={spanish} alt="lenguaje español" style={{height:"30px"}} /> : <img src={english} alt="lenguaje inglés" style={{height:"30px"}} />}
    </button>
  );
};

export default LanguageToggle;
