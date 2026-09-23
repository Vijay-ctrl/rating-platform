import api from "./api";

const authConfig = (token) => ({
   headers: {
      Authorization: `Bearer ${token}`,
   },
});

export const getStores = async (params, token) => {
   const response = await api.get("/user/stores", {
      ...authConfig(token),
      params,
   });

   return response.data;
};