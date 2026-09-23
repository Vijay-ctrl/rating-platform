import express from "express";

import authMiddleware from "../middleware/authMiddleware.mjs";
import authorizeRoles from "../middleware/roleMiddleware.mjs";

import {
   listStores,
} from "../controllers/userController.mjs";

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("USER"));

router.get(
   "/stores",
   listStores
);

export default router;