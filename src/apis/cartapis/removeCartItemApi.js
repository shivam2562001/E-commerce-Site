import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function removeCartProduct(productId,_id) {
  try {
     const data={
         productId,
         _id
     }
    return await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/cart/remove`,
      data,
      config
    );
  } catch (err) {
    throw err;
  }
}

export default removeCartProduct;