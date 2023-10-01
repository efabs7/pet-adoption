import { api } from "../Api/api";

export const usersApi = {
  get: async () => {
    return api.send("get", `/users/`);
  },
  getUsersAdmin: async (admin) => {
    return api.send("get", `/users/admin/${admin}`);
  },

  getUser: async (itemId) => {
    return api.send("get", "/users/" + itemId);
  },
  add: async (payload) => {
    return api.send("post", "/signup", payload);
  },
  update: async (payload, itemId) => {
    return api.send("put", "/users/" + itemId, payload);
  },
  updateUserPetInfo: async (payload, itemId) => {
    return api.send("put", "/users/petInfo/" + itemId, payload);
  },
  remove: async (itemId) => {
    return api.send("delete", "/users/" + itemId);
  },
};
