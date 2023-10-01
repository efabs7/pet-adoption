import { api } from "../Api/api";

export const petsApi = {
  get: async (params) => {
    return api.send("get", "/pets" + params);
  },
  getPet: async (id) => {
    return api.send("get", "/pets/" + id);
  },
  getUserPets: async (id) => {
    return api.send("get", "/pets/user/" + id);
  },
  add: async (permission, payload) => {
    return api.send("post", `/pets/${permission}`, payload);
  },
  addImg: async (payload, headers) => {
    return api.send("post", "/upload", payload, headers);
  },
  addUserAdopt: async (userId, payload) => {
    return api.send("post", `/pets/${userId}/adopt`, payload);
  },
  addUserFoster: async (userId, payload) => {
    return api.send("post", `/pets/${userId}/foster`, payload);
  },
  removeUserOwned: async (userId, payload) => {
    return api.send("post", `/pets/${userId}/return`, payload);
  },

  removeUserFostered: async (userId, payload) => {
    return api.send("post", `/pets/${userId}/return/fostered`, payload);
  },

  addUserSave: async (userId, payload) => {
    return api.send("post", `pets/${userId}/save`, payload);
  },

  update: async (itemId, permission, payload) => {
    return api.send("put", `/pets/${itemId}/${permission}`, payload);
  },
  removeUserSaved: async (userId, payload) => {
    return api.send("delete", `/pets/${userId}/save`, payload);
  },
};
