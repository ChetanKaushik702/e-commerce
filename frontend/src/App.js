import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignup from "./components/User/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import PaymentProtectedRoute from "./components/Route/PaymentProtectedRoute";
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from "./components/Order/OrderDetails";
import AdminRoute from './components/Route/AdminRoute';
import Dashboard from './components/Admin/Dashboard.js';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          exact
          path="/profile/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path='/cart' element={<Cart />}/>
        <Route exact path='/shipping' element={<ProtectedRoute component={Shipping}/>}/>
        <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder}/>}/>
        <Route exact path='/process/payment' element={<PaymentProtectedRoute component={Payment}/>}/>
        <Route exact path='/success' element={<ProtectedRoute component={OrderSuccess}/>}/>
        <Route exact path='/orders' element={<ProtectedRoute component={MyOrders}/>}/>
        <Route exact path='/order/:id' element={<ProtectedRoute component={OrderDetails}/>}/>
        <Route exact path='/admin/dashboard' element={<AdminRoute component={Dashboard}/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
