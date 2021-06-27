import React, { useContext, useEffect, useState } from "react";
// import {ProductConsumer} from'../Context';
import { Link } from "react-router-dom";
import { ButtonContainer } from "../components/Button";
import { ProductContext } from "../context/Context";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { PRODUCT_ACTION } from "../context/Context";
import addProductToCart from "../apis/cartapis/addincartApi";
import Loader from "react-loader-spinner";

export default function Details() {
  const { productState, productDispatch } = useContext(ProductContext);
  const { _id, title, price, company, description, image } =
    productState.detailProduct;

  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleProductAddToCart = async () => {
    try {
      setLoading(true);
      if (authState && authState.user && authState.user.id) {
        const res = await addProductToCart(_id, authState.user.id);

        if (res) {
          let payload = {
            message: res.data.message,
          };
          toast(res.data.message.toLocaleUpperCase(), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          productDispatch({
            type: PRODUCT_ACTION.ADD_PRODUCT_TO_CART,
            payload,
          });
          setLoading(false);
        }
      }
    } catch (error) {
      let payload = {
        ...error.response.data,
      };
      toast.error(error.response.data.message, {
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


  return (
    <>
      <div className="container py-5">
        <div className="contentTitle">
          <div className="col-15 mx-auto text-center text-slanted contentTitle text-blue my-5">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4 mx-auto col-md-6 my-6">
            <img src={image} className="img-fluid" alt="product" />
          </div>
          <div className="col-8  col-md-6 text-capitalize">
            <h2>model: {title}</h2>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              made by :<span className="text-uppercase">{company}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                price : <span>&#8377;</span>
                {price}
              </strong>
              <p className="text-capitalize font-weight-bold mt-3 mb-0">
                some info about product:
              </p>
              <p className="text-muted lead">{description}</p>
            </h4>
            <div>
              <Link to="/" style={{textDecoration : "none"}}>
                <span className="product-button">back to products</span>
              </Link>

              <ButtonContainer
                cart
                disabled={loading ? true : false}
                onClick={() => {
                  handleProductAddToCart();
                }}
              >
                {!loading ? (
                  <> add to cart</>
                ) : (

                    <Loader
                      type="ThreeDots"
                      color="#009ffd"
                      height={36}
                      width={111}
                    />
                )}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
