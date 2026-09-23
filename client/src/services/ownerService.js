import api from "./api";

const authConfig = (token) => ({
   headers: {
      Authorization: `Bearer ${token}`,
   },
});

export const getOwnerDashboard = async (token) => {
   const response = await api.get(
      "/owner/dashboard",
      authConfig(token)
   );

   return response.data;
};