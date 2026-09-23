import express from "express";

import authMiddleware from "../middleware/authMiddleware.mjs";
import authorizeRoles from "../middleware/roleMiddleware.mjs";

import {
   ownerDashboard,
} from "../controllers/ownerController.mjs";

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("STORE_OWNER"));

router.get(
   "/dashboard",
   ownerDashboard
);

export default router;