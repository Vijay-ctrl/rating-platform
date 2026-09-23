import express from "express";
import authMiddleware from "../middleware/authMiddleware.mjs";
import authorizeRoles from "../middleware/roleMiddleware.mjs";
import { changePassword } from "../controllers/passwordController.mjs";

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
   (req, res) => {
      res.status(200).json({
         success: true,
         data: {
            user: req.user,
         },
      });
   }
);

router.patch(
   "/password",
   authMiddleware,
   validate(updatePasswordSchema),
   changePassword
);

export default router;