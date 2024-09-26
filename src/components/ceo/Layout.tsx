import React from "react";
import NavbarHome from "../Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import Sidebar from "./components/Sidebar";

const CeoLayout = () => {
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

export default CeoLayout;