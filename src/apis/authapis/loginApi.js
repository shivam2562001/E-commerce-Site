import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
};

async function login(email, password) {
  try {
    const data = {
      email: email,
      password: password,
    };

    return await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      data,
      config
    );
  } catch (err) {
    throw err;
  }
}

export default login;
