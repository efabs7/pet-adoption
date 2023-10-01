import { api } from "../Api/api";

export const loginApi = {
  add: async (payload) => {
    return api.send("post", "/login", payload);
  },
};
