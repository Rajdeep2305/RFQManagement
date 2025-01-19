import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Page/Home";
import Register from "./Components/Page/Register";
import Login from "./Components/Page/Login";
import Help from "./Components/Page/Help";
import SearchVender from "./Components/Page/SearchVender";
import Management from "./Components/Page/Management";
import CreateRfq from "./Components/Page/CreateRfq";
import { AppContext } from "./Context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchRFQ from "./Components/Page/SearchRFQ";
import ProductManagement from "./Components/Page/ProductManagement";
import CreateProduct from "./Components/Page/CreateProduct";
import Manage from "./Components/Page/Manage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <MainRoutes />
      </Router>
    </>
  );
};

const MainRoutes = () => {
  const { isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn) {
      if (
        location.pathname === "/SearchVendor" ||
        location.pathname === "/Management" ||
        location.pathname === "/CreateRfq" ||
        location.pathname === "/ProductManagement" ||
        location.pathname === "/SearchRFQs" ||
        location.pathname === "/CreateProduct"
      ) {
        navigate("/login");
      }
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="h-screen max-w-screen font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn ? (
          <>
            <Route path="/SearchVendor" element={<SearchVender />} />
            <Route path="/SearchRFQs" element={<SearchRFQ />} />
            <Route path="/Management" element={<Management />} />
            <Route path="/ProductManagement" element={<ProductManagement />} />
            <Route path="/CreateRfq" element={<CreateRfq />} />
            <Route path="/help" element={<Help />} />
            <Route path="/CreateProduct" element={<CreateProduct/>}/>
            <Route path="/TechManage" element={<Manage/>}/>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/help" element={<Help />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
