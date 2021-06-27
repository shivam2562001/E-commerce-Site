import React, { useContext, useEffect, useState } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import clearCart from "../../apis/cartapis/clearCartapi";
import CartTotals from "./CartTotals";
import { ProductContext } from "../../context/Context";
import { PRODUCT_ACTION } from "../../context/Context";
import getCartProduct from "../../apis/cartapis/getCartProductApi";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import incrementCartProduct from "../../apis/cartapis/incrementProductofCartApi";
import decrementCartProduct from "../../apis/cartapis/decrementProductofCartApi";
import removeCartProduct from "../../apis/cartapis/removeCartItemApi";
import verify from "../../apis/authapis/verifyToken";
import { ACTIONS } from "../../context/authContext";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import placeOrder from "../../apis/orderapis/placeorder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default function Cart() {
  const { productState, productDispatch } = useContext(ProductContext);
  const { authState, dispatch } = useContext(AuthContext);

  let { cart, cartTotal } = productState;
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();
    getProducts(source);
    return () => source.cancel();
  }, []);

  const onClearCart = async () => {
    try {
      setLoading(true);
      const res = await clearCart(authState.user.id);
      if (res) {
        const payload = {
          cart: [],
          cartTotal: 0,
        };
        productDispatch({ type: PRODUCT_ACTION.CLEAR_CART, payload });
      }
      setLoading(false);
    } catch (err) {
      const payload = {
        ...err.response.data,
      };
      productDispatch({ type: PRODUCT_ACTION.GET_CART_FAILED, payload });
      setLoading(false);
    }
  };

  const onPlaceOrder = async () => {
    try {
      setLoading(true);
      const products = productState.cart
      const date = new Date();
      const res = await placeOrder(
        products,
        cartTotal,
        date,
        authState.user.id
      );
      if (res) {
        const payload = {
          message: res.data.message,
        };
        productDispatch({ type: PRODUCT_ACTION.PLACE_ORDER, payload });
        onClearCart();
        toast(res.data.message.toLocaleUpperCase(), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoading(false);
    } catch (err) {
      const payload = {
        ...err.response.data,
      };
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      productDispatch({ type: PRODUCT_ACTION.SET_ERROR, payload });
      setLoading(false);
    }
  };

  const decrement = async (productId) => {
    try {
      setLoading(true);
      const res = await decrementCartProduct(productId, authState.user.id);
      if (res) {
        getProducts("");
        productDispatch({
          type: PRODUCT_ACTION.DECREMENT_CART_PRODUCT,
          payload: {},
        });
      }
      setLoading(false);
    } catch (error) {
      const payload = {
        ...error.response.data,
      };
      productDispatch({ type: PRODUCT_ACTION.GET_CART_FAILED, payload });
      setLoading(false);
    }
  };

  const increment = async (productId) => {
    try {
      setLoading(true);
      const res = await incrementCartProduct(productId, authState.user.id);
      if (res) {
        getProducts("");
        productDispatch({
          type: PRODUCT_ACTION.INCREMENT_CART_PRODUCT,
          payload: {},
        });
      }
      setLoading(false);
    } catch (error) {
      const payload = {
        ...error.response.data,
      };
      productDispatch({ type: PRODUCT_ACTION.GET_CART_FAILED, payload });
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true);
      const res = await removeCartProduct(productId, authState.user.id);
      if (res) {
        getProducts("");
        productDispatch({
          type: PRODUCT_ACTION.REMOVE_CART_PRODUCT,
          payload: {},
        });
      }
      setLoading(false);
    } catch (error) {
      const payload = {
        ...error.response.data,
      };
      productDispatch({ type: PRODUCT_ACTION.GET_CART_FAILED, payload });
      setLoading(false);
    }
  };

  const getProducts = async (source) => {
    setLoading(true);
    try {
      const res = await verify(authState.token, source);

      if (res) {
        const payload = {
          isAuthenticated: res.data.isAuthenticated,
          user: {
            id: res.data.userId,
            email: res.data.email,
          },
        };
        dispatch({ type: ACTIONS.VERIFY_ACCESS_TOKEN, payload });
        if (res.data && res.data.userId) {
          const response = await getCartProduct(source, res.data.userId);
          if (response) {
            const payload = {
              cart: response.data.cartProducts,
              cartTotal: response.data.cartTotal,
            };
            productDispatch({ type: PRODUCT_ACTION.GET_PRODUCT_CART, payload });
            setLoading(false);
          }
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      localStorage.removeItem("access");
      const payload = {
        ...error.response.data,
        token: null,
      };
      productDispatch({ type: PRODUCT_ACTION.GET_CART_FAILED, payload });
      setLoading(false);
      history.push("/login");
    }
  };

  return (
    <>
      {loading ? (
        <div className="content">
          <Loader
            type="Rings"
            color="#009ffd"
            height={140}
            width={140}
            timeout={6000}
          />
        </div>
      ) : (
        <section>
          {cart && cart.length > 0 ? (
            <>
              <Title name="your" title="cart" />
              <CartColumns />
              <CartList
                value={cart}
                increment={increment}
                decrement={decrement}
                removeItem={removeItem}
              />
              <CartTotals
                cartTotal={cartTotal}
                onClearCart={onClearCart}
                onPlaceOrder={onPlaceOrder}
              />
            </>
          ) : (
            <EmptyCart />
          )}
        </section>
      )}
    </>
  );
}
