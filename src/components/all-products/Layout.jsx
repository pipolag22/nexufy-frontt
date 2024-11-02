import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FilterSidebar from "./components/FilterSidebar";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { getAllProducts } from "../../api/productService";
import NavbarHome from "../Navbar";
import { ThemeContext } from "../themes/ThemeContext";
import useLanguage from "../themes/useLanguage"; // Importar el hook useLanguage

const AllProductsLayout = () => {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  const t = useLanguage(); // Obtener las traducciones correspondientes usando el hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Si hay una categoría en el estado de navegación, establecerla en los filtros
    if (location.state?.category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: location.state.category,
      }));
    }
  }, [location.state]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.price) {
      if (filters.price === t.priceUnder10000) {
        filtered = filtered.filter((p) => p.price < 10000.0);
      } else if (filters.price === t.priceOver10000) {
        filtered = filtered.filter((p) => p.price >= 10000.0);
      } else if (filters.price === t.priceOver25000) {
        filtered = filtered.filter((p) => p.price > 25000.0);
      }
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    return filtered;
  };

  const filteredProducts = applyFilters();

  return (
    <div
      className={`d-flex flex-column h-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <nav className="position-fixed w-100 top-0 z-3">
        <NavbarHome />
      </nav>
      <div className="d-flex flex-grow-1">
        <aside>
          <FilterSidebar setFilters={setFilters} />
        </aside>
        <main
          className="flex-grow-1 me-4"
          style={{ marginLeft: "17rem", marginTop: "7rem" }}
        >
          <Outlet
            context={{ user, filteredProducts, loading, filters, setFilters }}
          />
        </main>
      </div>
    </div>
  );
};

export default AllProductsLayout;
