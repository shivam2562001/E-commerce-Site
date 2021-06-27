import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function placeOrder(products,amount,date,_id) {
  try {
    const data = {
      products,
      amount,
      date,
      _id
    };

    return await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/create/order`,
      data,
      config
    );
  } catch (err) {
    throw err;
  }
}

export default placeOrder;
