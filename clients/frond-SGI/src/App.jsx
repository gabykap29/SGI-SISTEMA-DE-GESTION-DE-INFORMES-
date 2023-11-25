import MenuLateral from "./components/Aside.jsx"
import Footer from "./components/Footer.jsx";
import Main from "./components/Main.jsx";
import Navbar from "./components/Navbar.jsx"

const App = ()=>{
  return (
    <div className="container-fluid" style={{fontSize:"small"}}>
      <div className="row"> 
        <div className="col-2 text-bg-dark">
          <MenuLateral />
        </div>
        <div className="col">
          <Navbar />
          {/* Contenido principal */}
          <Main />

        </div>
      </div>
    </div>
  );
}

export default App
