import React, { useState, useEffect } from "react";
import { useContext } from "react";
import getOrder from "../apis/orderapis/getorder";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Order from "../components/order";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authState } = useContext(AuthContext);
  const onGetOrders = async (source) => {
    try {
      setLoading(true);
      if (!(authState && authState.user)){   setLoading(false);   return;}
      console.log(authState.user.id)
      const res = await getOrder(authState.user.id, source);
      if (res) {
        setOrders(res.data.orders);
      }
      setLoading(false);
    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    onGetOrders(source);
    return () => source.cancel();
  }, []);
  return (
    <>
      {loading ? (
        <div className="content">
          <Loader
            type="Rings"
            color="#009ffd"
            height={140}
            width={140}
          />
        </div>
      ) : (
        <div className="container mt-4">
          {orders.length > 0 ? (
            orders.map((order, ind) => {
              return <div className="mt-2 mb-2"><Order key={ind} order={order} id={ind+1} /></div>;
            })
          ) : (
            <div className="container mt-5">
              <div className="row">
                <div className="col-10 mx-auto test-center text-title">
                  <h1>No Order exists</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default OrderList;
