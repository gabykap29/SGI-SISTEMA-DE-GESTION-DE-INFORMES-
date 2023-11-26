import { Outlet } from "react-router-dom";
import MenuLateral from "./Aside.jsx";
import Navbar from "./Navbar.jsx";
const Main = () => {
    return (
        <>
            <div className="container-fluid bg-dark" style={{ fontSize: "small", display: "flex" }}>
      {/* Menú lateral con 2 columnas */}
      <div className="col-2 text-bg-dark">
        <MenuLateral />
      </div>

      {/* Contenedor principal con flexbox */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Navbar con 10 columnas y color de fondo */}
        <div style={{ backgroundColor: "#212121", color: "white",  }}>
          <Navbar />
        </div>

        {/* Contenido principal que ocupa el resto del espacio */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
          <Outlet />
        </div>
      </div>
    </div>
        </>
    )
};

export default Main;