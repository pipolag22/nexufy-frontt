// FeaturedProduct.js
import { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ThemeContext } from "../themes/ThemeContext"; // Importar el ThemeContext
import { Link } from "react-router-dom";
import { LanguageContext } from "../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../themes/translations"; // Importar las traducciones
import { getAllProducts } from "../../api/productService";

const FeaturedProduct = () => {
  const { darkMode } = useContext(ThemeContext); // Acceder al estado del tema
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes
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

  if (loading) {
    return <div className="w-100 d-flex justify-content-center fs-4 fw-bold">{t.loadingFeaturedProducts}</div>;
  }
  
  if(products.length === 0){
    return <div className="w-100 d-flex justify-content-center fs-2 fw-bold">{t.unavailableProduct}</div>
  } 

  return (
    <div className="container">
      {/* Cambia el texto "Productos destacados" según el idioma */}
      <p
        className={`fs-3 text-center fw-bold ${
          darkMode ? "text-white" : "text-primary"
        }`}
      >
        {t.featuredProducts}
      </p>
      <ProductList products={products} />
      <div className="text-end mt-4 me-4 link-opacity-100-hover">
        {/* Cambia el color del enlace según el modo oscuro o claro */}
        <Link
          to="/all"
          className={`fw-medium ${darkMode ? "text-white" : "text-primary"}`}
        >
          {t.viewAllProducts} →
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProduct;
