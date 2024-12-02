import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/actionTypes";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const initialToken = Cookies.get("token");
if (initialToken) {
  setAuthToken(initialToken);
}

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    console.log("Login Attempt:", { username: username, password });

    const { data } = await axiosInstance.post("/auth/login", {
      username: username.trim(),
      password: password.trim(),
    });
    console.log("Login Successful", data);

    Cookies.set("token", data.accessToken, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(data.username));
    localStorage.setItem("token", data.accessToken);

    setAuthToken(data.accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data.username, accessToken: data.accessToken },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  setAuthToken(null);
  Cookies.remove("token");
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  dispatch({ type: LOGOUT });
};

export const fetchUserList = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_LIST_REQUEST });
    const { data } = await axiosInstance.get("/users");
    dispatch({
      type: FETCH_USER_LIST_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const editUser = (userId, updatedUserData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_USER_REQUEST });
    const { data } = await axiosInstance.put(
      `/users/${userId}`,
      updatedUserData,
    );

    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: data,
    });

    console.log("User Updated Successfully:", data);
    } catch (error) {
    console.error("Edit User Error:", error.message);
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const response = await axiosInstance.delete(
      `/users/${userId}`,
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: userId,
      //my comment
    });
    console.log("User Deleted Successfully", response.data);
  } catch (error) {
    console.error("Delete User Error:", error.message);
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.message,
    });
  }
};

// export const refreshToken = () => async (dispatch) => {
//   try {
//     const token = Cookies.get("token");

//     if (!token) {
//       console.warn("No token found during refresh");
//       return dispatch({ type: TOKEN_REFRESH_FAIL });
//     }

//     const { data } = await axiosInstance.post("/auth/refresh-token", { token });

//     console.log("Refreshed Token Response:", data.refreshToken);

//     Cookies.set("token", data.refreshToken, { expires: 7 });
//     localStorage.setItem("token", data.refreshToken);

//     setAuthToken(data.refreshToken);

//     dispatch({ type: REFRESH_TOKEN, payload: data.refreshToken });
//   }
//   catch (error) {
//     console.error(
//       "Token Refresh Error:", error.message,
//     );

//     dispatch({
//       type: TOKEN_REFRESH_FAIL,
//       payload: error.message,
//     });
//   }
// };

export default axiosInstance;
