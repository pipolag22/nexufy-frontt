import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
import translations from "../../themes/translations";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const AbmShop = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await getAllProducts();
        setProductos(products);
        setFilteredProducts(products);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

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
        setFilteredProducts(productos);
      }
    };

    fetchSearchedProducts();
  }, [searchQuery, productos]);

  const handleEdit = (id) => {
    // Redirigir a EditProduct o EditProductCeo según el rol del usuario
    const editPath = user.roles.includes("ROLE_SUPERADMIN")
      ? `/ceo/edit-product/${id}`
      : `/edit-product/${id}`;
    navigate(editPath);
  };

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: t.confirmDeleteTitle,
      text: t.confirmDeleteMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t.delete,
      cancelButtonText: t.confirmDeleteCancelButton,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleConfirmDelete(id);
        Swal.fire(t.deleted, t.productDeletedMessage, "success");
      }
    });
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteProduct(id);
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      setError(error);
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
            variant="link"
            onClick={() => handleEdit(item.id)}
          >
            <FaEdit />
          </Button>
          <Button
            style={{ height: "22px", width: "22px", padding: "0" }}
            variant="link"
            onClick={() => confirmDeleteProduct(item.id)}
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
    </div>
  );
};

export default AbmShop;
