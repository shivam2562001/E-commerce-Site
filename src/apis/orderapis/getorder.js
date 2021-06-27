import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function getOrder(_id,source) {
  try {
    
    return await Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/show/order/${_id}`,
      config,
      { cancelToken: source.action }
    );
  } catch (err) {
    if (Axios.isCancel(err)) {
        throw err;
    }
    else throw err;
  }
}

export default getOrder;
