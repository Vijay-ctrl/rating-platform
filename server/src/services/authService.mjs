import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.mjs";
import prisma from "../config/prisma.mjs";
import AppError from "../utils/AppError.mjs";

export const registerUser = async ({ name, email, address, password }) => {
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
         role: "USER",
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

export const loginUser = async ({ email, password }) => {
   const user = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   if (!user) {
      throw new AppError("Invalid email or password", 401);
   }

   const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
   );

   if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
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