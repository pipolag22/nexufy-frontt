import { useContext } from "react";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../components/themes/ThemeContext";
import NavbarHome from "../components/Navbar";
import { Outlet } from "react-router-dom";
import FilterSidebar from "./components/FilterSidebar";

const AllProductsLayout = () => {
  const { user } = useContext(AuthenticationContext);
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
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
            <FilterSidebar />
          </aside>
          <main
            className="flex-grow-1 me-4"
            style={{ marginLeft: "17rem", marginTop: "7rem" }}
          >
            {" "}
            {/* Ajusta el margen izquierdo */}
            <Outlet context={{ user }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default AllProductsLayout;
