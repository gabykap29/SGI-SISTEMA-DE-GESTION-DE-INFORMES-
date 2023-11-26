import { Outlet } from "react-router-dom";
import MenuLateral from "./Aside.jsx";
import Navbar from "./Navbar.jsx";

const Main = () => {
  return (
    <div className="container-fluid bg-dark" style={{ fontSize: "small", display: "flex" }}>
      <div className="col-2 text-bg-dark">
        <MenuLateral />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ backgroundColor: "#212121", color: "white" }}>
          <Navbar />
        </div>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#F4EAE0" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
