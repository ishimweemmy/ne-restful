import _ from "axios";
import Cookies from "js-cookie";

const baseUrl = "";

const axios = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const api = _.create({
  baseURL: baseUrl,
});

export const AuthApi = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default axios;
