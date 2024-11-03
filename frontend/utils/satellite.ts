import axios from "axios";
import Cookies from "js-cookie";

const satellite = () => {
  const headers = { authorization: "" };
  const authToken = Cookies.get("AUTH_TOKEN");

  if (authToken) {
    headers.authorization = `Bearer ${authToken}`;
  }

  const instance = axios.create({
    headers,
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
  });

  return instance;
};

export default satellite;
