import React, { useReducer } from "react";
import getProducts from "../apis/productapis/productApis";


const intialProductState = {
  products: [],
  detailProduct: {
    _id: "",
    title: "",
    price: "",
    company: "",
    description: "",
    image: "",
  },
  cart: [],
  wishlist : [],
  modalOpen: false,
  modalProduct: null,
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0,
  error: null,
  message: null,
};

export const PRODUCT_ACTION = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_PRODUCT_FAILED: "SET_PRODUCT_FAILED",
  SET_DETAIL_PRODUCT: "SET_DETAIL_PRODUCT",
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  GET_PRODUCT_CART: "GET_PRODUCT_CART",
  SET_ERROR: "SET_ERROR",
  CLEAR_CART: "clear cart",
  DECREMENT_CART_PRODUCT: "DECREMENT_CART_PRODUCT",
  INCREMENT_CART_PRODUCT: "INCREMENT_CART_PRODUCT",
  REMOVE_CART_PRODUCT:"REMOVE_CART_PRODUCT",
  PLACE_ORDER:"PLACE_ORDER",
  SET_WISHLIST:"set wishlist",
};

function reducer(productState, action) {
  let { type, payload } = action;
  switch (type) {
    case PRODUCT_ACTION.SET_PRODUCT:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.SET_PRODUCT_FAILED:
      return {
        ...productState,
        ...payload,
      };

    case PRODUCT_ACTION.SIGNUP_FAILED:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.SET_DETAIL_PRODUCT:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.ADD_PRODUCT_TO_CART:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.GET_PRODUCT_CART:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.CLEAR_CART:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.DECREMENT_CART_PRODUCT:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.INCREMENT_CART_PRODUCT:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.REMOVE_CART_PRODUCT:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.PLACE_ORDER:
      return {
        ...productState,
        ...payload,
      };
    case PRODUCT_ACTION.SET_WISHLIST:
      return {
        ...productState,
        ...payload,
      };

    case PRODUCT_ACTION.SET_ERROR:
      return {
        ...productState,
        ...payload,
      };

    default:
      return productState;
  }
}

export const ProductContext = React.createContext();

function ProductProvider(props) {
  const [productState, dispatch] = useReducer(reducer, intialProductState);

  //  useEffect(() => {
  //    setProducts;
  //  }, [])

  //  const setProducts = () => {
  //    try{
  //       const res = await getProducts();
  //       if(res){
  //         const payload={
  //            products : res.data.products,
  //         }
  //         dispatch({type : PRODUCT_ACTION.SET_PRODUCT,payload})
  //       }
  //    }catch(error){
  //         dispatch({type : PRODUCT_ACTION.SET_PRODUCT_FAILED,payload})
  //    }
  //  };

  // const getItem = (id) => {
  //    const product = productState.products.find((item) => item._id === id);
  //    return product;
  //  };

  // const handleDetail = (id) => {
  //    const product = getItem(id);
  //    const payload = {
  //      detailProduct : product.description,
  //    }
  //    dispatch({type: PRODUCT_ACTION.SET_DETAIL_PRODUCT,payload})
  //  };
  //  const addToCart = (id) => {
  //    let tempProducts = [...productState.products];
  //    const index = tempProducts.indexOf(getItem(id));
  //    const product = tempProducts[index];
  //    product.inCart = true;
  //    product.count = 1;
  //    const price = product.price;
  //    product.total = price;
  //    this.setState(
  //      () => {
  //        return { products: tempProducts, cart: [...this.state.cart, product] };
  //      },
  //      () => {
  //        this.addTotals();
  //      }
  //    );
  //  };

  //  openModal = (id) => {
  //    const product = this.getItem(id);
  //    this.setState(() => {
  //      return { modalProduct: product, modalOpen: true };
  //    });
  //  };
  //  closeModal = () => {
  //    this.setState(() => {
  //      return { modalOpen: false };
  //    });
  //  };
  //  increment = (id) => {
  //    let tempCart = [...this.state.cart];
  //    const selectedProduct = tempCart.find((item) => item.id === id);

  //    const index = tempCart.indexOf(selectedProduct);

  //    const product = tempCart[index];

  //    product.count = product.count + 1;
  //    product.total = product.count * product.price;

  //    this.setState(() => {
  //        return { cart: [...tempCart] };
  //      },
  //      () => {
  //        this.addTotals();
  //      });

  //  };
  //  decrement = (id) => {
  //    let tempCart = [...this.state.cart];
  //    const selectedProduct = tempCart.find((item) => item.id === id);

  //    const index = tempCart.indexOf(selectedProduct);
  //    const product = tempCart[index];

  //    product.count = product.count - 1;
  //    if (product.count === 0) {
  //      this.removeItem(id);
  //    } else {
  //      product.total = product.count * product.price;

  //      this.setState(() => {
  //          return { cart: [...tempCart] };
  //        },
  //        () => {
  //          this.addTotals();
  //        });
  //    }
  //  };
  //  removeItem = (id) => {
  //    let tempProducts = [...this.state.products];
  //    let tempCart = [...this.state.cart];
  //    tempCart = tempCart.filter(item => item.id !== id);
  //    const index = tempProducts.indexOf(this.getItem(id));
  //    let removedProduct = tempProducts[index];
  //    removedProduct.inCart = false;
  //    removedProduct.count = 0;
  //    removedProduct.total = 0;
  //    this.setState(() => {
  //        return {
  //          cart: [...tempCart],
  //          products: [...tempProducts],
  //        }
  //      },
  //      () => {
  //        this.addTotals();
  //      });
  //  };
  //  clearCart = () => {
  //    this.setState(
  //      () => {
  //        return { cart: [] };
  //      },
  //      () => {
  //        this.setProducts();
  //        this.addTotals();
  //      }
  //    );
  //  };
  //  addTotals = () => {
  //    let subTotal = 0;
  //    this.state.cart.map(item => (subTotal += item.total));
  //    const tempTax = subTotal * 0.1;
  //    const tax = parseFloat(tempTax.toFixed(2));
  //    const total = subTotal + tax;
  //    this.setState(() => {
  //      return {
  //        cartSubTotal: subTotal,
  //        cartTax: tax,
  //        CartTotal: total,
  //      };
  //    });
  //  };
  return (
    <ProductContext.Provider
      value={{
        productState,
        productDispatch: dispatch,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
