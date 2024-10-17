import { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/productService";

const FeaturedProduct = () => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Añadir un estado de carga

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.slice(0, 4)); // Tomar solo los primeros 4 productos
        setLoading(false); // Desactivar estado de carga
      } catch (error) {
        console.error(error);
        setLoading(false); // Desactivar estado de carga en caso de error
      }
    };
    fetchProducts();
  }, []);
    // Muestra un mensaje de carga mientras se obtienen los productos
    if (loading) {
      return <div>Cargando productos destacados...</div>;
    }
console.log(products)
  return (
    <div className="container">
      {/* Cambia el color del texto "Productos destacados" según el modo oscuro o claro */}
      <p
        className={`fs-3 text-center fw-bold ${
          darkMode ? "text-white" : "text-primary"
        }`}
      >
        Productos destacados
      </p>
      <ProductList products={products} />
      <div className="text-end mt-4 me-4 link-opacity-100-hover">
        {/* Cambia el color del enlace según el modo oscuro o claro */}
        <Link
          to="/all"
          className={`fw-medium ${darkMode ? "text-white" : "text-primary"}`}
        >
          Ver todos los productos →
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;
