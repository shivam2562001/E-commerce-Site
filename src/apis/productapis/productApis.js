import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function getProducts(source,id) {
  try {
    return await Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
      config,
      { cancelToken: source.token }
    );
  } catch (err) {
    if (Axios.isCancel(err)) {
    } else throw err;
  }
}

export default getProducts;
