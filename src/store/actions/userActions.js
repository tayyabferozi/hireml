import jwt_decode from "jwt-decode";

import setGLobalAxiosToken from "../../utils/set-global-token";
import * as actionTypes from "./actionTypes";

export const setLoggedInUser = (access_token, email) => {
  const decoded = jwt_decode(access_token);
  localStorage.setItem("token", access_token);
  setGLobalAxiosToken(access_token);
  return {
    type: actionTypes.SET_LOGGED_IN_USER,
    payload: { access_token, email: decoded.data },
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  setGLobalAxiosToken();
  dispatch({
    type: actionTypes.SET_LOGGED_IN_USER,
    payload: { access_token: "" },
  });
};

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwt_decode(token);
    dispatch(setLoggedInUser(token, decoded.data));
  } else {
    dispatch(logoutUser());
  }
};
