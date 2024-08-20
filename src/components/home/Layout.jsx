import NavbarHome from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <NavbarHome />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
