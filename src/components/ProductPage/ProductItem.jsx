// ProductItem.js
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import { ThemeContext } from "../themes/ThemeContext";
import { LanguageContext } from "../themes/LanguageContext"; // Importar el LanguageContext
import translations from "../themes/translations"; // Importar las traducciones
import ProductCard from "./components/ProductCard";
import ProductComments from "./components/ProductComments";
import ProductData from "./components/ProductData";
import ProductSeller from "./components/ProductSeller";
import { getProduct } from "../../api/productService";

const ProductItem = () => {
  const [producto, setProducto] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext); // Obtener el idioma actual
  const t = translations[language]; // Obtener las traducciones correspondientes
  const { id } = useParams(); // Usa useParams para obtener el ID del producto

  // Verifica si el ID del producto existe
  if (!id) {
    return <div>{t.productNotFound}</div>; // Mensaje para el caso sin producto
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id); // Usa el ID directamente
        setProducto(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  // Verifica si el producto se ha cargado
  if (!producto) {
    return <div>{t.loadingProduct}</div>; // Mensaje de carga
  }

  const { image, name, description, price, category, customerId } = producto;

  return (
    <>
      <ProductCard
        id={id} // Puedes seguir usando el ID aquí
        image={image}
        name={name}
        price={price}
        category={category}
        customerId={customerId}
      />

      <ProductData description={description} />

      <hr
        className={`container border-2 ${
          darkMode ? "border-white" : "border-dark"
        }`}
      />

      <ProductSeller customerId={customerId} />

      <h3
        className={`container fs-3 fw-medium my-4 ${
          darkMode ? "text-white" : "text-dark"
        }`}
      >
        {t.productComments}
      </h3>

      <ProductComments productId={id} />
    </>
  );
};

export default ProductItem;
