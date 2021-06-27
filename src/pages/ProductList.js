import React, { useEffect, useContext, useState } from "react";
import Product from "../components/Product";
import Title from "../components/Title";
import { ProductContext } from "../context/Context";
import getProducts from "../apis/productapis/productApis";
import Loader from "react-loader-spinner";
import { PRODUCT_ACTION } from "../context/Context";
import axios from "axios";
import getfavourites from "../apis/productapis/favouritesapi";
import { AuthContext } from "../context/authContext";


export default function ProductList(props) {
  const { productState, productDispatch } = useContext(ProductContext);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setProducts(source);
    return () => source.cancel();
  }, []);

  const setProducts = async (source) => {
    try {
      setLoading(true);
      const { user } = authState;
      const res = await getProducts(source,user.id);
  
   
      if (res) {
        const payload = {
          products: res.data.products,
        };
        productDispatch({ type: PRODUCT_ACTION.SET_PRODUCT, payload });
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      const payload = {
        ...error.response.data,
      };
      productDispatch({ type: PRODUCT_ACTION.SET_PRODUCT_FAILED, payload });
      setLoading(false);
    }
  };



  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
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
            <div className="row">
              {productState.products.length > 1 ? (
                productState.products.map((product) => {
                  return (
                    <Product
                      key={product._id}
                      product={product}
                      productDispatch={productDispatch}
                      productState={productState}
                    />
                  );
                })
              ) : (
                <div className="container noproduct">
                  {" "}
                  <div className="col-10 mx-auto my-2 text-center">
                    No Product in shop
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
