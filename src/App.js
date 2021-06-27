import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Cart from "./components/cart/Cart";
import Modal from "./components/Modal";
import SignIn from "./pages/Login";
import SignUp from "./pages/Signup";
import { PrivateRoute } from "./components/ProtectedRoute";
import { AuthContext } from "./context/authContext";
import Details from "./pages/Details";
import WishList from "./pages/WishList";
import "react-toastify/dist/ReactToastify.css";
import OrderList from "./pages/OrderList";
function App() {
  const { authState, _ } = useContext(AuthContext);
  
  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute
          exact
          path="/"
          isAuthenticated={authState.isAuthenticated}
        >
          <ProductList />
        </PrivateRoute>
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute
          path="/details"
          isAuthenticated={authState.isAuthenticated}
        >
          <Details />
        </PrivateRoute>
        <PrivateRoute path="/cart" isAuthenticated={authState.isAuthenticated}>
          <Cart />
        </PrivateRoute>
        <PrivateRoute path="/orders" isAuthenticated={authState.isAuthenticated}>
          <OrderList />
        </PrivateRoute>
        <PrivateRoute path="/wishlist" isAuthenticated={authState.isAuthenticated}>
          <WishList/>
        </PrivateRoute>
      </Switch>
      <Modal />
    </>
  );
}

export default App;
