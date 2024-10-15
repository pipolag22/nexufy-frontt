import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";
import { getAllProducts, searchProducts } from "../../../api/productService"; // Asegúrate de que tienes una función para buscar productos
import { ThemeContext } from "../../themes/ThemeContext";
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar"; // Importa SearchBar

const AbmShop = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirige a la página de login si no hay usuario
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (user) {
        try {
          const products = await getAllProducts();
          setProductos(products);
          setFilteredProducts(products); // Inicializa los productos filtrados
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllProducts();
  }, [user]);

  // Efecto para manejar la búsqueda
  useEffect(() => {
    const fetchSearchedProducts = async () => {
      if (searchQuery) {
        try {
          const results = await searchProducts(searchQuery); // Llama a la función de búsqueda
          setFilteredProducts(results); // Actualiza los productos filtrados
        } catch (error) {
          setError(error);
        }
      } else {
        setFilteredProducts(productos); // Restablece a todos los productos si no hay búsqueda
      }
    };

    fetchSearchedProducts();
  }, [searchQuery, productos]); // Se activa cuando searchQuery o productos cambian

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
    {
      header: "Precio",
      accessor: "price",
      render: (item) => `$${item.price}`,
    },
    {
      header: "Categoría",
      accessor: "category",
      render: (item) => item.category,
    },
    {
      header: "Acciones",
      accessor: "actions",
      render: (item) => (
        <Button
          style={{ height: "22px", fontSize: "12px", textAlign: "center" }}
          className="py-1"
          variant={darkMode ? "outline-light" : "outline-primary"}
        >
          Editar
        </Button>
      ),
    },
  ];

  const handleEdit = (updatedProduct) => {
    setProductos((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="fs-4 w-50 fw-semibold">Productos de usuarios</p>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
        />
      </div>

      <CustomTable
        columns={productColumns}
        data={filteredProducts}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default AbmShop;
