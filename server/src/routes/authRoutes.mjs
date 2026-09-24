import express from "express";
import authMiddleware from "../middleware/authMiddleware.mjs";
import authorizeRoles from "../middleware/roleMiddleware.mjs";
import { changePassword } from "../controllers/passwordController.mjs";
import prisma from "../config/prisma.mjs";

import {
   register,
   login,
} from "../controllers/authController.mjs";

import validate from "../middleware/validate.mjs";

import {
   registerSchema,
   loginSchema,
   updatePasswordSchema,
} from "../validators/authValidator.mjs";

const router = express.Router();

router.post(
   "/register",
   validate(registerSchema),
   register
);

router.post(
   "/login",
   validate(loginSchema),
   login
);

router.get(
   "/me",
   authMiddleware,
   authorizeRoles("ADMIN", "USER", "STORE_OWNER"),
   async (req, res, next) => {
      try {
         const user = await prisma.user.findUnique({
            where: {
               id: req.user.userId,
            },
            select: {
               id: true,
               name: true,
               email: true,
               address: true,
               role: true,
            },
         });

         if (!user) {
            return res.status(404).json({
               success: false,
               message: "User not found",
            });
         }

         res.status(200).json({
            success: true,
            data: {
               user: {
                  userId: user.id,
                  name: user.name,
                  email: user.email,
                  address: user.address,
                  role: user.role,
               },
            },
         });
      } catch (error) {
         next(error);
      }
   }
);

router.patch(
   "/password",
   authMiddleware,
   validate(updatePasswordSchema),
   changePassword
);

export default router;