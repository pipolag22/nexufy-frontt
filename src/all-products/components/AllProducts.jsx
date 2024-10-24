import React from "react";
import ProductList from "../../components/Products/ProductList";
import { useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";

const AllProducts = () => {
  const { filteredProducts, loading, filters, setFilters } = useOutletContext();

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
              variant="outline-secondary"
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
        <p className="fs-3 container">No hay productos con esas características</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </>
  );
};

export default AllProducts;
