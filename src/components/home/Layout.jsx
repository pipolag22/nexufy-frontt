import Footer from "../Footer/Footer";
import NavbarHome from "../Navbar";
import { Outlet } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Layout = () => {
  return (
    <>
      <nav>
        <NavbarHome />
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
