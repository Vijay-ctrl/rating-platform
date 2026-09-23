import bcrypt from "bcryptjs";

import prisma from "../config/prisma.mjs";
import AppError from "../utils/AppError.mjs";

export const updatePassword = async ({
   userId,
   currentPassword,
   newPassword,
}) => {
   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
      select: {
         id: true,
         passwordHash: true,
      },
   });

   if (!user) {
      throw new AppError("User not found", 404);
   }

   const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
   );

   if (!isCurrentPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
   }

   const isSamePassword = await bcrypt.compare(
      newPassword,
      user.passwordHash
   );

   if (isSamePassword) {
      throw new AppError(
         "New password must be different from the current password",
         400
      );
   }

   const passwordHash = await bcrypt.hash(newPassword, 12);

   await prisma.user.update({
      where: {
         id: userId,
      },
      data: {
         passwordHash,
      },
   });

   return true;
};