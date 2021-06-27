import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function verify(token, source) {
  try {
    return await Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/verify/${token}`,
      config,
      { cancelToken: source.action }
    );
  } catch (err) {
    if (Axios.isCancel(err)) {
      throw err;
    } else throw err;
  }
}

export default verify;
