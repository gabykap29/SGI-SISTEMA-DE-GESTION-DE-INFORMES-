import perfil from '../assets/perfil.png'; 
import notificaciones from '../assets/notificaciones.png';
const Navbar = ()=>{
    return (
        <>
          <header className="p-3  border-bottom col Headers " id="Headers" >
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/index" className="nav-link px-2 text-dark">Home</a></li>
                <li><a href="/informes/views" className="nav-link px-2 text-dark">Informes</a></li>
                <li><a href="/ver/personas" className="nav-link px-2 text-dark">Personas</a></li>
                <li><a href="/view/usuarios" className="nav-link px-2 text-dark itemsAdmin ">Usuarios</a></li>
                <li><a href="#" className="nav-link px-2 text-dark">About</a></li>
              </ul>
              <div className="dropdown">
                <a className="dropdown-toggle"   role="button" href="#" id="notifications" data-bs-toggle="dropdown" aria-expanded="true"><img src={notificaciones} alt="" style={{width:"30px"}} /></a>
                <ul className="dropdown-menu alert alert-primary" id="itemsNotifications">
                  <li><a className="dropdown-item" href="#">Sin notificaciones</a></li>
                </ul>
              </div>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input type="search" className="form-control form-control-ligth text-bg-ligth" placeholder="Search..." aria-label="Search" />
              </form>
      
              <div className="text-end">
                <div className="dropdown d-flex justify-content-end pt-2 mb-2">
                  <a href="#" className="d-flex  align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="user">
                    <img src={perfil} alt='perfil' style={{width:"30px"}} className="rounded-circle me-2" />
                    <strong>Username</strong>
                  </a>
                  <ul className="dropdown-menu text-small ">
                    <li><a className="dropdown-item" href="#">Modificar</a></li>
                    <li><a className="dropdown-item" href="/usuarios/<%= uid %>/show">Perfil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/closeSesion">Cerrar sesión</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        </>
    )
};

export default Navbar;