import Main from "./components/Main.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/auth/login.jsx";
import Error from "./Pages/error/404.jsx";
import { ReportRoutes } from "./routes/ReportRoutes.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import Store from "./Pages/reports/Store.jsx";
import ShowReport from "./Pages/reports/Show.jsx";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main/*" element={<Main />}>
          {/* Ruta relativa a /main */}
          <Route path="informes/cargar" element={<Store />} />
          <Route path="informes/verTodos" element={<ShowReport />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
