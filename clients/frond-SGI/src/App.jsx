import Main from "./components/Main.jsx";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./Pages/auth/login.jsx";
import { PrivateRoutes } from "./context/PrivateRoutes.jsx";
import Error from "./Pages/error/404.jsx";
const App = () => {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoutes />} />
          <Route path="/main" element={<Main />}>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
  );
};

export default App;
