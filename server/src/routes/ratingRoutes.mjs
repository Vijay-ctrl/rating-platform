import express from "express";

import authMiddleware from "../middleware/authMiddleware.mjs";
import authorizeRoles from "../middleware/roleMiddleware.mjs";
import validate from "../middleware/validate.mjs";

import { ratingSchema } from "../validators/ratingValidator.mjs";
import { rateStore } from "../controllers/ratingController.mjs";

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("USER"));

router.post(
   "/",
   validate(ratingSchema),
   rateStore
);

export default router;