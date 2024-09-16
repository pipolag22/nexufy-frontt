import NavbarHome from "../Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";

const AdminLayout = () => {
  const {user}=useContext(AuthenticationContext);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <nav>
          <NavbarHome />
        </nav>
        <div className="d-flex flex-grow-1">
          <aside>
            <Sidebar />
          </aside>
          <main className="flex-grow-1" style={{marginLeft:"18rem"}}>
            <Outlet context={{ user }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
