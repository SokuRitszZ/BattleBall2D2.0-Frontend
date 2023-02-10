import axios from "axios";

import { http, mode } from "@/config.json";
import { typeResponse } from "@/types";

const api = axios.create({
  baseURL: `${http[mode]}/api`,
});

function getHeader() {
  const token = localStorage.getItem("token") || "";
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};

api.interceptors.request.use(config => {
  const headerNew = { ...config.headers, ...getHeader() };
  // @ts-ignore
  config.headers = headerNew;
  return config;
}, err => {
  throw err;
});

api.interceptors.response.use(response => {
  const data: typeResponse = response.data;
  if (data.code === 0) {
    return data.data;
  } else {
    throw Error(data.msg);
  }
}, err => {
  throw Error("网络错误");
});

export default api;