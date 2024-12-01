import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

export const setAuthToken = (token) => {
  if (token) 
  {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } 
  else 
  {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const initialToken = Cookies.get("token");
if (initialToken) {
  setAuthToken(initialToken);
}

export default axiosInstance;