import prisma from "../config/prisma.mjs";

import AppError from "../utils/AppError.mjs";

export const getOwnerDashboard = async (ownerId) => {
   const store = await prisma.store.findUnique({
      where: {
         ownerId,
      },

      select: {
         id: true,
         name: true,
         email: true,
         address: true,

         ratings: {
            select: {
               id: true,
               rating: true,
               createdAt: true,

               user: {
                  select: {
                     id: true,
                     name: true,
                     email: true,
                     address: true,
                  },
               },
            },
         },
      },
   });

   if (!store) {
      throw new AppError(
         "Store not found for this owner",
         404
      );
   }

   const ratings = store.ratings;

   const averageRating =
      ratings.length > 0
         ? ratings.reduce(
            (sum, item) => sum + item.rating,
            0
         ) / ratings.length
         : 0;

   return {
      store: {
         id: store.id,
         name: store.name,
         email: store.email,
         address: store.address,
      },

      averageRating: Number(
         averageRating.toFixed(2)
      ),

      totalRatings: ratings.length,

      users: ratings.map((item) => ({
         id: item.user.id,
         name: item.user.name,
         email: item.user.email,
         address: item.user.address,
         rating: item.rating,
         submittedAt: item.createdAt,
      })),
   };
};