import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REFRESH_TOKEN,
  TOKEN_REFRESH_FAIL,
} from "../constants/actionTypes";

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;  
  }
};


const initialState = {
  loading: false,
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token") || Cookies.get("token") || null, 
  error: null,
};


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };

    case REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case TOKEN_REFRESH_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
