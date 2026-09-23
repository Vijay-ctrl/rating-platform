import prisma from "../config/prisma.mjs";

export const getStoresForUser = async ({
   name,
   address,
   sortBy = "name",
   sortOrder = "asc",
}, userId) => {
   const allowedSortFields = [
      "name",
      "address",
      "createdAt",
   ];

   const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

   const safeSortOrder = sortOrder === "desc" ? "desc" : "asc";

   const where = {};

   if (name) {
      where.name = {
         contains: name,
         mode: "insensitive",
      };
   }

   if (address) {
      where.address = {
         contains: address,
         mode: "insensitive",
      };
   }

   const stores = await prisma.store.findMany({
      where,
      select: {
         id: true,
         name: true,
         address: true,
         ratings: {
            select: {
               rating: true,
               userId: true,
            },
         },
      },
      orderBy: {
         [safeSortBy]: safeSortOrder,
      },
   });

   return stores.map((store) => {
      const ratings = store.ratings;

      const averageRating =
         ratings.length > 0
            ? ratings.reduce((sum, item) => sum + item.rating, 0) /
            ratings.length
            : 0;

      const userRating = ratings.find(
         (item) => item.userId === userId
      );

      return {
         id: store.id,
         name: store.name,
         address: store.address,
         averageRating: Number(averageRating.toFixed(2)),
         userRating: userRating ? userRating.rating : null,
      };
   });
};