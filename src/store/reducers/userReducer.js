import * as actionTypes from "../actions/actionTypes";

const initialState = { access_token: null, email: null };

const setLoggedInUser = (state, action) => {
  return { ...state, ...action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGGED_IN_USER:
      return setLoggedInUser(state, action);
    default:
      return initialState;
  }
};

export default reducer;
