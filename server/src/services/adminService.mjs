import bcrypt from "bcryptjs";

import prisma from "../config/prisma.mjs";
import AppError from "../utils/AppError.mjs";

export const createUser = async ({
   name,
   email,
   address,
   password,
   role = "USER",
}) => {
   const existingUser = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   if (existingUser) {
      throw new AppError("An account with this email already exists", 409);
   }

   const passwordHash = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
      data: {
         name,
         email,
         address,
         passwordHash,
         role,
      },
      select: {
         id: true,
         name: true,
         email: true,
         address: true,
         role: true,
         createdAt: true,
      },
   });

   return user;
};

export const getDashboardStats = async () => {
   const [totalUsers, totalStores, totalRatings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
   ]);

   return {
      totalUsers,
      totalStores,
      totalRatings,
   };
};

export const getUsers = async ({
   name,
   email,
   address,
   role,
   sortBy = "name",
   sortOrder = "asc",
}) => {
   const allowedSortFields = [
      "name",
      "email",
      "address",
      "role",
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

   if (email) {
      where.email = {
         contains: email,
         mode: "insensitive",
      };
   }

   if (address) {
      where.address = {
         contains: address,
         mode: "insensitive",
      };
   }

   if (role) {
      where.role = role;
   }

   const users = await prisma.user.findMany({
      where,
      select: {
         id: true,
         name: true,
         email: true,
         address: true,
         role: true,
         createdAt: true,
      },
      orderBy: {
         [safeSortBy]: safeSortOrder,
      },
   });

   return users;
};

export const getUserById = async (userId) => {
   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
      select: {
         id: true,
         name: true,
         email: true,
         address: true,
         role: true,
         createdAt: true,
         ownedStore: {
            select: {
               id: true,
               name: true,
               email: true,
               address: true,
               ratings: {
                  select: {
                     rating: true,
                  },
               },
            },
         },
      },
   });

   if (!user) {
      throw new AppError("User not found", 404);
   }

   let storeDetails = null;

   if (user.ownedStore) {
      const ratings = user.ownedStore.ratings;

      const averageRating =
         ratings.length > 0
            ? ratings.reduce((sum, item) => sum + item.rating, 0) /
            ratings.length
            : 0;

      storeDetails = {
         id: user.ownedStore.id,
         name: user.ownedStore.name,
         email: user.ownedStore.email,
         address: user.ownedStore.address,
         averageRating: Number(averageRating.toFixed(2)),
         totalRatings: ratings.length,
      };
   }

   return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      store: storeDetails,
   };
};

export const createStore = async ({
   name,
   email,
   address,
   ownerId,
}) => {
   const owner = await prisma.user.findUnique({
      where: {
         id: ownerId,
      },
      select: {
         id: true,
         role: true,
      },
   });

   if (!owner) {
      throw new AppError("Store owner not found", 404);
   }

   if (owner.role !== "STORE_OWNER") {
      throw new AppError(
         "Selected user is not a store owner",
         400
      );
   }

   const existingStore = await prisma.store.findUnique({
      where: {
         ownerId,
      },
   });

   if (existingStore) {
      throw new AppError(
         "This store owner already has a store",
         409
      );
   }

   const store = await prisma.store.create({
      data: {
         name,
         email,
         address,
         ownerId,
      },
      select: {
         id: true,
         name: true,
         email: true,
         address: true,
         ownerId: true,
         createdAt: true,
      },
   });

   return store;
};


export const getStores = async ({
   name,
   email,
   address,
   sortBy = "name",
   sortOrder = "asc",
}) => {
   const allowedSortFields = [
      "name",
      "email",
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

   if (email) {
      where.email = {
         contains: email,
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
         email: true,
         address: true,
         createdAt: true,
         ratings: {
            select: {
               rating: true,
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

      return {
         id: store.id,
         name: store.name,
         email: store.email,
         address: store.address,
         averageRating: Number(averageRating.toFixed(2)),
         totalRatings: ratings.length,
         createdAt: store.createdAt,
      };
   });
};