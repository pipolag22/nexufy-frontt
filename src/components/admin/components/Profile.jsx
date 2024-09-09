import React, { useEffect, useState } from "react";
import ProductList from "../../Products/ProductList";
import { getProductsByCustomerId } from "../../../api/customerService";

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clientId = "66bbd887094da25c9d6e7ef9";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProductsByCustomerId(clientId);
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <div>
      <h2>Profile</h2>
      <ProductList products={products}/>
    </div>
  );
};

export default Profile;
