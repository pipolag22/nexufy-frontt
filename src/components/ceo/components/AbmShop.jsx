import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { Button, Form, Table } from "react-bootstrap";
import { getAllProducts } from "../../../api/productService";
import { useOutletContext } from "react-router-dom";

const AbmShop = () => {
  const { user } = useOutletContext();

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) {
    return <Navigate to="/login" />; // Redirigir si no hay usuario
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (user) {
        // Verificamos si es superadmin
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

  const productColumns = [
    {
      header: "Nombre del producto",
      accessor: "name",
      render: (item) => item.name,
    },
    { header: "Precio", accessor: "price", render: (item) => `$${item.price}` },
    {
      header: "Categoría",
      accessor: "category",
      render: (item) => item.category,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => <Button style={{height:"22px", fontSize:"12px" ,textAlign:"center"}} className="py-1" variant="outline-primary">Editar</Button> ,
    },
  ];

  return (
    <div
      className="container shadow p-4 bg-light-subtle mb-3 mx-2 "
      style={{ borderRadius: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
      <p className="fs-4 w-50 fw-semibold">Productos de usuarios</p>
        <Form className="d-flex ">  
          <Form.Control type="text" placeholder="Buscar producto" />
          <Button className="mx-2"><i className="bi bi-search"></i></Button>
        </Form>
      </div>

      <CustomTable columns={productColumns} data={productos} />
    </div>
  );
};

export default AbmShop;
