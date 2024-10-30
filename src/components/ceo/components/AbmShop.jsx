import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Importar Modal
import { Navigate, useOutletContext, useNavigate } from "react-router-dom";
import {
  getAllProducts,
  searchProducts,
  deleteProduct,
} from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext";
import { LanguageContext } from "../../themes/LanguageContext";
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar";
import translations from "../../themes/translations"; // Importar traducciones
import { FaEdit, FaTrash } from "react-icons/fa"; // Importar los íconos

const AbmShop = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate(); // Para redireccionar

  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para el modal de confirmación
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await getAllProducts();
        setProductos(products);
        setFilteredProducts(products); // Inicializa los productos filtrados
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []); // Solo al montar

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      if (searchQuery) {
        try {
          const results = await searchProducts(searchQuery);
          setFilteredProducts(results);
        } catch (error) {
          setError(error);
        }
      } else {
        setFilteredProducts(productos); // Restablece a todos los productos
      }
    };

    fetchSearchedProducts();
  }, [searchQuery, productos]);

  if (isLoading) {
    return <p>{t.loading}</p>;
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>;
  }

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); // Navegar a la página de edición
  };

  const confirmDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowModal(true); // Mostrar el modal de confirmación
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== productToDelete)
      ); // Actualizar la lista de productos
      setProductToDelete(null);
      setShowModal(false); // Cerrar el modal
    }
  };

  const productColumns = [
    {
      header: t.productName,
      accessor: "name",
      render: (item) => item.name,
    },
    {
      header: t.price,
      accessor: "price",
      render: (item) => `$${item.price}`,
    },
    {
      header: t.category,
      accessor: "category",
      render: (item) => item.category,
    },
    {
      header: t.actions,
      accessor: "actions",
      render: (item) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            style={{ height: "22px", width: "22px", padding: "0" }}
            variant="link" // Usar un estilo de botón de enlace para el ícono de editar
            onClick={() => handleEdit(item.id)} // Editar producto
          >
            <FaEdit />
          </Button>
          <Button
            style={{ height: "22px", width: "22px", padding: "0" }}
            variant="link" // Usar un estilo de botón de enlace para el ícono de eliminar
            onClick={() => confirmDeleteProduct(item.id)} // Eliminar producto
          >
            <FaTrash style={{ color: "red" }} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`container shadow p-4 mb-3 mx-2 ${
        darkMode ? "bg-dark text-light" : "bg-light-subtle"
      }`}
      style={{ borderRadius: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="fs-4 w-50 fw-semibold">{t.products}</p>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
        />
      </div>

      <CustomTable columns={productColumns} data={filteredProducts} />

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t.confirmDeleteTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t.confirmDeleteMessage}</p>
          <p>
            <strong>{t.revertWarning}</strong>
          </p>{" "}
          {/* Mensaje adicional */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t.confirmDeleteCancelButton}
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            {t.confirmDeleteConfirmButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AbmShop;
