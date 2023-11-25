import iconoLogin from "../../assets/images/iconoLogin.png";
const Login = () => {
  return (
    <div classNameName="text-center">
      <main className="form-signin  container">
        <form
          action="#"
          id="formLogin"
          className="col-11 col-lg-6 text-start p-4 rounded border border-2 shadow-sm mx-auto gap-2"
        >
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <img
              className="mb-4 col"
              src={iconoLogin}
              alt="icono del login"
              style={{ width: "72px", height: "57" }}
            />
            <h1 className="h3 mb-3 fw-normal col">
              Sistema de Gestión de Informes
            </h1>
          </div>

          <div
            className="container d-flex align-items-center flex-column"
            id="inputs"
          >
            <div className="container col">
              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="admin"
                  name="username"
                />
                <label for="floatingInput">Usuario</label>
              </div>
              <div className="form-floating col">
                <input
                  type="password"
                  className="form-control "
                  id="password"
                  placeholder="Password"
                />
                <label for="floatingPassword">Contraseña</label>
              </div>
            </div>
          </div>

          <div className="checkbox mb-3 d-flex align-items-center flex-column justify-content-center">
            <label>
              <input type="checkbox" value="remember-me" /> Recordar contraseña
            </label>
          </div>
          <div className="container d-flex justify-content-center flex-column align-items-center">
            <button
              className=" btn btn-lg btn-primary "
              id="btn-submit"
              type="submit"
            >
              Iniciar
            </button>
            <p className="mt-5 mb-3 text-body-secondary">
              © Todos los derechos reservados 2023
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
