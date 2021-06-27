import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/Context";
import { Link } from "react-router-dom";
import { PRODUCT_ACTION } from "../context/Context";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import getfavourites from "../apis/productapis/favouritesapi";
import Title from "../components/Title";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function WishList() {
  const { productState, productDispatch } = useContext(ProductContext);
  const { authState } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const source = axios.CancelToken.source();
    getFav(source);
    return () => source.cancel();
  }, []);

  const getFav = async (source) => {
    try {
      setLoading(true);
      const { user } = authState;
      const res = await getfavourites(source, user.id);
      if (res) {
        setWishlist(res.data.favouriteProducts);
      }
      setLoading(false);
    } catch (err) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="container pt-5">
      {loading ? (
        <div className="content">
          <Loader type="Rings" color="#009ffd" height={140} width={140} />
        </div>
      ) : (
        <>
          {wishlist && wishlist.length > 0 ? (
            <>
             <Title name="" title="Wishlist" />
              {wishlist.map((prod, ind) => {
                return (
                  <ProductWrapper
                    key={ind}
                    className="col-8 mx-auto col-md-6 col-lg-3 my-3"
                  >
                    <div className="card">
                      <div
                        className="img-container p-5"
                        onClick={() => {
                          let payload = {
                            detailProduct: prod,
                          };
                          productDispatch({
                            type: PRODUCT_ACTION.SET_DETAIL_PRODUCT,
                            payload,
                          });
                        }}
                      >
                        <Link to="/details">
                          <img
                            src={prod.image}
                            alt="product"
                            width="150px"
                            height="200px"
                            className="card-img-top"
                          ></img>
                        </Link>
                      </div>
                      <div className="card-footer d-flex justify-content-between position-static">
                        <p className="align-self-center mb-0">{prod.title}</p>
                        <h5 className="text-blue  font-italic mb-0">
                          <span className="mr-1">
                            <strong>&#8377;</strong>
                          </span>
                          {prod.price}
                        </h5>
                      </div>
                    </div>
                  </ProductWrapper>
                );
              })}
            </>
          ) : (
            <div className="container noproduct">
                  {" "}
                  <div className="col-10 mx-auto my-2 text-center">
                    No Wishlist in shop
                  </div>
                </div>
          )}
        </>
      )}
    </div>
  );
}

export default WishList;

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
