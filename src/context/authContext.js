import React, {  useReducer,useEffect} from "react";
import verify from "../apis/authapis/verifyToken";
import axios from "axios";
export const ACTIONS = {
  LOGIN_SUCESS: "LOGIN_SUCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  SIGNUP_SUCESS: "SIGNUP_SUCESS",
  SIGNUP_FAILED: "SIGNUP_FAILED",
  LOGOUT: "LOGOUT",
  SET_ERROR: "SET_ERROR",
  VERIFY_ACCESS_TOKEN:"verify access token",
};

const intialState = {
  error: null,
  user: null,
  message: null,
  token: localStorage.getItem("access"),
  isAuthenticated: false,
};

function reducer(authState, action) {
  let { type, payload } = action;
  switch (type) {
    case ACTIONS.LOGIN_SUCESS:
      return {
        ...authState,
        ...payload,
      };
    case ACTIONS.LOGIN_FAILED:
      return {
        ...authState,
        ...payload,
      };
    case ACTIONS.SIGNUP_SUCESS:
      return {
        ...authState,
        ...payload,
      };
    case ACTIONS.SIGNUP_FAILED:
      return {
        ...authState,
        ...payload,
      };
    case ACTIONS.LOGOUT:
      return {
        ...authState,
        ...payload,
      };
    case ACTIONS.VERIFY_ACCESS_TOKEN:
      return {
        ...authState,
        ...payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...authState,
        ...payload,
      };
      

    default:
      return authState;
  }
}

export const AuthContext =React.createContext();

function AuthProvider(props) {
  const [authState, dispatch] = useReducer(reducer, intialState);


  const verifyToken = async (source) => {
    try {
      const res = await verify(authState.token, source);
      if (res) {
        const payload = {
          isAuthenticated: res.data.isAuthenticated,
          user: {
            id: res.data.userId,
            email: res.data.email,
          },
        };
        dispatch({ type: ACTIONS.VERIFY_ACCESS_TOKEN, payload });
      }
    } catch (error) {
      const payload = {
        ...error.response.data,
      };
      dispatch({ type: ACTIONS.SET_ERROR, payload });
    }
  };
  


  return (
     <AuthContext.Provider
      value={{
          authState,
          dispatch,
          verifyToken,
      }}
     >
      {props.children}
     </AuthContext.Provider>
  );
}

export default AuthProvider;
