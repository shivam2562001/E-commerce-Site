import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function clearCart(_id) {
  try {


    return await Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/cart/clear/${_id}`,
      config
    );
  } catch (err) {
    throw err;
  }
}

export default clearCart;