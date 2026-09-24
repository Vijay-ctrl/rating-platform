import bcrypt from "bcryptjs";

import generateToken from "../utils/jwt.mjs";

import prisma from "../config/prisma.mjs";

import AppError from "../utils/AppError.mjs";

export const registerUser = async ({
   name,
   email,
   address,
   password,
   role,
}) => {
   // Public registration only allows USER and ADMIN accounts.
   // STORE_OWNER accounts should be created by the admin.
   if (!["USER", "ADMIN"].includes(role)) {
      throw new AppError(
         "Invalid account type for registration",
         400
      );
   }

   const existingUser = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   if (existingUser) {
      throw new AppError(
         "An account with this email already exists",
         409
      );
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

export const loginUser = async ({
   email,
   password,
   role,
}) => {
   const user = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   if (!user) {
      throw new AppError(
         "Invalid email or password",
         401
      );
   }

   const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
   );

   if (!isPasswordValid) {
      throw new AppError(
         "Invalid email or password",
         401
      );
   }

   if (user.role !== role) {
      throw new AppError(
         "Selected login role does not match this account",
         403
      );
   }

   const token = generateToken({
      userId: user.id,
      role: user.role,
   });

   return {
      token,

      user: {
         id: user.id,
         name: user.name,
         email: user.email,
         address: user.address,
         role: user.role,
      },
   };
};