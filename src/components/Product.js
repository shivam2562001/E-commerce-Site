import React, { useContext, useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PRODUCT_ACTION } from "../context/Context";
import { AuthContext } from "../context/authContext";
import addProductToCart from "../apis/cartapis/addincartApi";
import { toast } from "react-toastify";
import addFavourite from "../apis/productapis/addFavourite";
import removeFavourite from "../apis/productapis/removeFavourite";
import Loader from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default function Product(props) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { _id, title, price, company, description, image ,fav} = props.product;
  const [favourite, setFavourite] = useState(fav);

    // useEffect(() => {
    //   if (authState && authState.user && authState.user.id) {
    //   props.checkFavourite(authState.user.id,_id)}      
    // }, [])




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
          props.productDispatch({
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
      props.productDispatch({ type: PRODUCT_ACTION.SET_ERROR, payload });
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (favourite == false) {
      if (authState && authState.user && authState.user.id) {
        try {
          setFavourite(true);
          await addFavourite(_id, authState.user.id);
        } catch (err) {
          setFavourite(false);
        }
      }
    } else {
      if (authState && authState.user && authState.user.id) {
        try {
          setFavourite(false);
          await removeFavourite(_id, authState.user.id);
        } catch (err) {
          setFavourite(true);
        }
      }
    }
  };

  return (
    <>
      {/* <ToastContainer/> */}
      <ProductWrapper className="col-8 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          {loading ? (
            <div className="img-container stylediv">
              <div className="text-center loaderdiv">
                <Loader type="Rings" color="#009ffd" height={140} width={140} />
              </div>
            </div>
          ) : (
            <div
              className="img-container p-5"
              onClick={() => {
                let payload = {
                  detailProduct: props.product,
                };
                props.productDispatch({
                  type: PRODUCT_ACTION.SET_DETAIL_PRODUCT,
                  payload,
                });
              }}
            >
              <>
                <Link to="/details">
                  <img
                    src={image}
                    alt="product"
                    width="150px"
                    height="200px"
                    className="card-img-top"
                  ></img>
                </Link>
                <div className="overlay" onClick={handleWishlist}>
                  {favourite ? (
                    <i className="fas fa-heart icon-b fa-lg"></i>
                  ) : (
                    <i className="fas fa-heart icon-a fa-lg"></i>
                  )}
                </div>
                <button
                  className="cart-btn"
                  disabled={false}
                  onClick={() => {
                    handleProductAddToCart();
                  }}
                >
                  <i className="fas fa-cart-plus" />
                </button>
              </>
            </div>
          )}
          {/* card footer*/}
          <div className="card-footer d-flex justify-content-between position-static">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue  font-italic mb-0">
              <span className="mr-1">
                <strong>&#8377;</strong>
              </span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    </>
  );
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
    width: 100%;
    height: 100%;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;

    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0%, 0%);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
