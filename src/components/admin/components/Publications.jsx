import React, { useEffect, useState } from "react";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";

const Publications = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clientId = "66bbd7ee094da25c9d6e7ef8";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCustomerId(clientId);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [clientId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <div>
      <h2>Productos publicados por ti</h2>
      <ProductList products={products}/>
    </div>
  );
};

export default Publications;