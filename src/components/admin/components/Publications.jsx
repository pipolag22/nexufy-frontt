import { useEffect, useState } from "react";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";
import { useOutletContext } from "react-router-dom";

const Publications = () => {
  const { user } = useOutletContext();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user && user.id) {
          // Asegúrate de que `user` y `user.id` existen
          const token = localStorage.getItem("token");
          const data = await getProductsByCustomerId(user.id, token);
          setProducts(data);
        }
      } catch (error) {
        setError(error.message || "Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <div>
      <h2>Productos publicados por ti</h2>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No tienes productos publicados.</p>
      )}
    </div>
  );
};

export default Publications;
