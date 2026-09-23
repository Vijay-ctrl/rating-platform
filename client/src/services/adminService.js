import api from "./api";

const authConfig = (token) => ({
   headers: {
      Authorization: `Bearer ${token}`,
   },
});

export const getDashboardStats = async (token) => {
   const response = await api.get(
      "/admin/dashboard",
      authConfig(token)
   );

   return response.data;
};

export const getUsers = async (params, token) => {
   const response = await api.get("/admin/users", {
      ...authConfig(token),
      params,
   });

   return response.data;
};

export const getUserDetails = async (userId, token) => {
   const response = await api.get(
      `/admin/users/${userId}`,
      authConfig(token)
   );

   return response.data;
};

export const createUser = async (userData, token) => {
   const response = await api.post(
      "/admin/users",
      userData,
      authConfig(token)
   );

   return response.data;
};

export const createAdmin = async (adminData, token) => {
   const response = await api.post(
      "/admin/admins",
      adminData,
      authConfig(token)
   );

   return response.data;
};

export const createStoreOwner = async (ownerData, token) => {
   const response = await api.post(
      "/admin/store-owners",
      ownerData,
      authConfig(token)
   );

   return response.data;
};

export const getStores = async (params, token) => {
   const response = await api.get("/admin/stores", {
      ...authConfig(token),
      params,
   });

   return response.data;
};

export const createStore = async (storeData, token) => {
   const response = await api.post(
      "/admin/stores",
      storeData,
      authConfig(token)
   );

   return response.data;
};