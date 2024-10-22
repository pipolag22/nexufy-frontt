// ProductData.js
import { useContext } from "react";
import { Table } from "react-bootstrap";
import { ThemeContext } from "../../themes/ThemeContext"; // Ruta corregida
import { LanguageContext } from "../../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../../themes/translations"; // Importar las traducciones

const ProductData = ({ description }) => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes

  return (
    <div className="container mt-4">
      <Table className="align-middle" style={{ height: "300px" }}>
        <tbody>
          <tr>
            <td
              className={`text-center fw-semibold w-25 ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-dark-subtle text-dark-emphasis"
              }`}
            >
              {t.descriptionLabel}
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              {description}
            </td>
          </tr>
          <tr>
            <td
              className={`text-center fw-semibold ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-dark-subtle text-dark-emphasis"
              }`}
            >
              {t.statusLabel}
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              {t.productStatus}
            </td>
          </tr>
          <tr>
            <td
              className={`text-center fw-semibold ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-dark-subtle text-dark-emphasis"
              }`}
            >
              {t.presentationLabel}
            </td>
            <td
              className={darkMode ? "bg-dark text-light" : "bg-body-secondary"}
            >
              {t.productPresentation}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductData;
