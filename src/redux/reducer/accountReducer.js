import { LOGIN_USER, LOGOUT } from "./type";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  img: "",
};

export const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
