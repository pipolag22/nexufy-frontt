import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../components/themes/ThemeContext";
import NavbarHome from "../components/Navbar";
import { Outlet } from "react-router-dom";
import FilterSidebar from "./components/FilterSidebar";
import { getAllProducts } from "../api/productService";

const AllProductsLayout = () => {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);

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

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.price) {
      if (filters.price === "Menor a $10000") {
        filtered = filtered.filter((p) => p.price < 10000.00);
      } else if (filters.price === "Mayor a $10000") {
        filtered = filtered.filter((p) => p.price >= 10000.00);
      } else if (filters.price === "Mayor a $25000") {
        filtered = filtered.filter((p) => p.price > 25000.00);
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
            context={{
              user,
              filteredProducts,
              loading,
              filters,
              setFilters, // Pasamos setFilters para manipular los filtros desde el hijo
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default AllProductsLayout;
