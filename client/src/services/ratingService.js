import api from "./api";

const authConfig = (token) => ({
   headers: {
      Authorization: `Bearer ${token}`,
   },
});

export const submitRating = async (ratingData, token) => {
   const response = await api.post(
      "/ratings",
      ratingData,
      authConfig(token)
   );

   return response.data;
};