import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useOutletContext } from "react-router-dom";
import { getAllProducts, searchProducts } from "../../../api/productService";
import { ThemeContext } from "../../themes/ThemeContext";
import { LanguageContext } from "../../themes/LanguageContext";
import CustomTable from "./CustomTable";
import SearchBar from "./SearchBar";
import translations from "../../themes/translations"; // Importar traducciones

const AbmShop = () => {
  const { user } = useOutletContext();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language];

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
        <Button
          style={{ height: "22px", fontSize: "12px", textAlign: "center" }}
          className="py-1"
          variant={darkMode ? "outline-light" : "outline-primary"}
        >
          {t.edit}
        </Button>
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
