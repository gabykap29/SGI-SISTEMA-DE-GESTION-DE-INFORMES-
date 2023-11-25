import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Main = () => {
    return (
        <>
        <div className="container">
            <h1>SGI</h1>
            <Outlet />
        </div>
        </>
    )
};

export default Main;