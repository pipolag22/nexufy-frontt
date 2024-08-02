import { useEffect, useState } from "react";
import Card from "./components/Card";
import { fetchProduct } from "./services/productService";

function App() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProduct("12345");
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    loadProduct();
  }, []);

  return (
    <>
      <h1>Data de DB</h1>
      {product ? (
        <Card
          name={product.name}
          description={product.description}
          price={product.price}
          category={product.category}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}

export default App;
