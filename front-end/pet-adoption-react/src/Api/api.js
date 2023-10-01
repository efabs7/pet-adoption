import axios from "axios";
import { getUserFromStorage } from "../Auth/storage";

const instance = axios.create({
  // baseURL: "https://64972c8583d4c69925a378cc.mockapi.io",
  baseURL: process.env.REACT_APP_API_PORT,
});

const getConfig = () => {
  const token = getUserFromStorage();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const api = {
  send: async (method, url, payload) => {
    if (method === "get") {
      const resp = await instance[method](url, {
        ...getConfig(),
        params: payload,
      });
      return resp.data;
    } else {
      if (!payload) {
        const resp = await instance[method](url, getConfig());
        return resp.data;
      } else {
        const resp = await instance[method](url, payload, getConfig());
        return resp.data;
      }
    }
  },
};
