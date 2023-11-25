import '../components/components/Aside/Aside.css';
import iconoLogin from '../assets/iconoLogin.png';
import iconoDashboard from '../assets/dashboard.png';
import iconoNotas from '../assets/notas.png';
import iconoPersonas from '../assets/persona.png';
import iconoUsuarios from '../assets/usuarios.png';
const MenuLateral = () => {
    return (
        <div class="col-2  m-0 p-0 aling-self-start">
        <aside className=" d-flex flex-column justify-content-center ">
<div className="d-flex flex-column p-3 bg-body-tertiary" >
    <div className="d-flex" id="logo">
        <a href="/index" role="button" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img className="bi mr-2 "  role="img" style={{width:"40px"}} src={iconoLogin} />
          </a>
          <h2>SGI</h2>
      </div>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
</a>
<hr />
<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
  
  <li className="  mx-3">
    <div className="d-flex">
      <a className="nav-link  mx-2" href="/index" data-bs-toggle="dropdown" role="button" aria-expanded="false" >
        <img src={iconoDashboard}  alt=""  className='iconosAside'/> 
      </a>
      <span className="pt-3">Dashboard</span>
    </div>
    <ul className="list-unstyled ">
      <li className="px-5 mb-2"><a className=" nav-link "  href="/informes/graficos/departamentos">Departamentos</a></li>
      <li className="px-5 mb-2"><a className=" nav-link "  href="/informes/graficos/localidades">Localidades</a></li>
      <li className="px-5 mb-2"><a className=" nav-link " href="/informes/graficos/fecha">Fechas</a></li>
      <li className="px-5 "><a className=" nav-link " href="/informes/graficos/titulo">Titulos</a></li>
    </ul>

  </li>
  <li className="mx-3">
    <div className="d-flex">
      <a className="nav-link  mx-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={iconoNotas} alt="imagen de informes" className='iconosAside'   /> 
      </a>
      <span className="pt-3">Informes</span>
    </div>
      <ul className="menu list-unstyled">
        <li className="px-5 mb-2"><a className="nav-link itemsUser"  href="/informes/create">Cargar</a></li>
        <li className="px-5 "><a className="nav-link" href="/informes/views">Filtros</a></li>

      </ul>
    </li>
  <li className="mx-3">
    <div className="d-flex">
      <a className="nav-link mx-2" href="#" role="button"  data-bs-toggle="dropdown" aria-expanded="false">
        <img src={iconoPersonas} alt="" class="iconosAside"  /> 
      </a>
      <span className="pt-3">Personas</span>
    </div>
    <ul className="menu list-unstyled ">
      <li><a className="px-5  nav-link" href="/ver/personas">Buscar</a></li>
    </ul>
  </li>
  <li className="mx-3 ">
    <div className="d-flex">
      <a className="nav-link mx-2 itemsAdmin" href="#" role="button"  data-bs-toggle="dropdown" aria-expanded="false">
        <img src={iconoUsuarios} className='iconosAside' alt=""  /> 
      </a>
      <span className="pt-3">
        Usuarios
      </span>
    </div>
    <ul className="list-unstyled  menu ">
      <li className="px-5 "><a className="nav-link itemsAdmin" href="/view/usuarios">Ver</a></li>

    </ul>
  </li>
</ul>
</div>
        </aside>
        </div>
    )
}

export default MenuLateral;