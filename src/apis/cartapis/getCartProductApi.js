import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function getCartProduct(source, _id) {
  try {
  
    if (source) {
      return await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/cart/product/${_id}`,
        config,
        { cancelToken: source.token }
      );
    } else {
      return await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/cart/product/${_id}`,
        config
      );
    }
  } catch (err) {
    if (Axios.isCancel(err)) {
    } else throw err;
  }
}

export default getCartProduct;
