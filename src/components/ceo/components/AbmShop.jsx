import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllProducts } from "../../../api/productService";
import { useOutletContext, Navigate } from "react-router-dom";

const AbmShop = () => {
  const { user } = useOutletContext();

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (user) {
        try {
          const products = await getAllProducts();
          setProductos(products);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllProducts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  return (
    <div className="container ">
      <Table striped bordered hover variant="light">
        <thead>
          <tr className="text-center">
            <th>Nombre de usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AbmShop;
