import iconoLogin from "../../assets/iconoLogin.png"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";



const Login = () => {

  const {loginUser , isAuthenticated} = useContext(AuthContext)

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  };

  const [loading, setLoading ] = useState(false);

  const {
    form: datos,
    handleInputChange,
    reset,
  } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await loginUser(datos);
      reset();
      <Navigate to="/" replace />;
    } catch (error) {
      console.log(error);
      setLoading(false)
      if (error.includes("Failed to fetch")) {
        return alert(
          "error al iniciar sesión: El servidor no respondió a la petición."
          );
        }
      return alert("error al iniciar sesión: " + error);
    }




  }

  return (
    <div classNameName="text-center">
      <main className="form-signin  container">
        <form
          action="#"
          id="formLogin"
          onSubmit={handleSubmit}
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
                  value={datos.username}
                  onChange={handleInputChange}
                  name="username"
                />
                <label for="floatingInput">Usuario</label>
              </div>
              <div className="form-floating col">
                <input
                  type="password"
                  className="form-control "
                  value={datos.password}
                  onChange={handleInputChange}
                  id="password"
                  placeholder="Password"
                  name="password"
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
              disabled={loading}
            >
              Iniciar
            </button>
            {loading &&  <div className="spinner-border spinner-border-sm" role="status"></div> }
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
