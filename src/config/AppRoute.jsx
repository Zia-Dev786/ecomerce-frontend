import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/home/pages/Home";
import Adminhome from "../features/adminhome/pages/Adminhome";
import UserLayout from "../core/layout/Userlayout";
import AdminLayout from "../core/layout/Adminlayout";
import ProtectedRoute from "../core/component/ProtectedRoute";
import UserProduct from "../features/home/pages/UserProduct";
import Orders from "../features/home/pages/Orders";
import AddtoCart from "../features/home/pages/AddtoCart";
import AdminOrder from "../features/adminhome/pages/AdminOrder";
import AdminProduct from "../features/adminhome/pages/AdminProduct";
import ProductbyCategroy from "../features/home/pages/ProductbyCategroy";
import ProductDetial from "../features/home/pages/ProductDetial";
import OrderDetail from "../features/home/pages/OrderDetail";
import AdminCustomer from "../features/adminhome/pages/AdminCustomer";
import ChatBot from "../features/home/pages/ChatBot";

function AppRooute() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* ================= USER ================= */}

      <Route element={<ProtectedRoute role='user'/>}>
        <Route element={<UserLayout />}>

          <Route index path="/" element={<Home />} />
          <Route  path="/products" element={<UserProduct />} />
          <Route  path="/products/productDetial/:id" element={<ProductDetial />} />
          <Route  path="/products/:category" element={<ProductbyCategroy />} />
          <Route  path="/orders" element={<Orders />} />
          <Route  path="/order/:id" element={<OrderDetail />} />
          <Route  path="/addtocart" element={<AddtoCart />} />
          <Route  path="/chatbot" element={<ChatBot />} />

          {/* <Route
            path="/order"
            element={<order />}
          /> */}

        </Route>
      </Route>


      {/* ================= ADMIN ================= */}

      <Route element={<ProtectedRoute/>}>
        <Route  element={<AdminLayout />}>

          <Route
            path="/adminhome"
            element={<Adminhome />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrder />}
          />

          <Route
            path="/admin/products"
            element={<AdminProduct />}
          />
          <Route
            path="/admin/customers"
            element={<AdminCustomer />}
          />


        </Route>
      </Route>

    </Routes>
  );
}

export default AppRooute;
