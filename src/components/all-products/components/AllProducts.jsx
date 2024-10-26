import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProductList from "../../Products/ProductList";
import { ThemeContext } from "../../themes/ThemeContext";
import { LanguageContext } from "../../themes/LanguageContext";
import translations from "../../themes/translations";

const AllProducts = () => {
  const { filteredProducts, loading, filters, setFilters } = useOutletContext();

  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext); // Acceder al idioma actual
  const t = translations[language]; // Obtener las traducciones para el idioma actual

  const removeFilter = (key) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key]; // Eliminar el filtro especificado
      return newFilters;
    });
  };

  if (loading) {
    return <div>Cargando todos los productos...</div>;
  }

  return (
    <>
      <div className="mx-5 mb-4">
        {Object.entries(filters).map(([key, value]) => (
          <>
            <Button
              key={key}
              variant={darkMode ? "outline-light" : "outline-secondary"}
              onClick={() => removeFilter(key)}
              className="mx-1"
              size="sm"
            >
              {`${value} ✖`}
            </Button>
          </>
        ))}
      </div>
      {filteredProducts.length < 1 ? (
        <p className="fs-3 container">{t.unavailableProduct}</p>
      ) : (
        <div style={{height:"100vh"}}>
          <ProductList products={filteredProducts} />
        </div>
      )}
    </>
  );
};

export default AllProducts;
