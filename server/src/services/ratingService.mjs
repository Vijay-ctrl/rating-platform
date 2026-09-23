import prisma from "../config/prisma.mjs";
import AppError from "../utils/AppError.mjs";

export const submitRating = async ({
   userId,
   storeId,
   rating,
}) => {
   const store = await prisma.store.findUnique({
      where: {
         id: storeId,
      },
   });

   if (!store) {
      throw new AppError("Store not found", 404);
   }

   const existingRating = await prisma.rating.findUnique({
      where: {
         userId_storeId: {
            userId,
            storeId,
         },
      },
   });

   if (existingRating) {
      const updatedRating = await prisma.rating.update({
         where: {
            id: existingRating.id,
         },
         data: {
            rating,
         },
      });

      return updatedRating;
   }

   const newRating = await prisma.rating.create({
      data: {
         userId,
         storeId,
         rating,
      },
   });

   return newRating;
};