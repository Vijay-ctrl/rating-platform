import express from "express";

import authMiddleware from "../middleware/authMiddleware.mjs";
import authorizeRoles from "../middleware/roleMiddleware.mjs";
import validate from "../middleware/validate.mjs";

import {
   createUserSchema,
   createAdminSchema,
   createStoreOwnerSchema,
   createStoreSchema,
} from "../validators/adminValidator.mjs";

import {
   addUser,
   addAdmin,
   addStoreOwner,
   dashboardStats,
   listUsers,
   userDetails,
   addStore,
   listStores,
} from "../controllers/adminController.mjs";

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("ADMIN"));

router.post(
   "/users",
   validate(createUserSchema),
   addUser
);

router.post(
   "/admins",
   validate(createAdminSchema),
   addAdmin
);

router.get(
   "/dashboard",
   dashboardStats
);

router.get(
   "/users",
   listUsers
);

router.get(
   "/users/:id",
   userDetails
);

router.post(
   "/stores",
   validate(createStoreSchema),
   addStore
);

router.post(
   "/store-owners",
   validate(createStoreOwnerSchema),
   addStoreOwner
);

router.get(
   "/stores",
   listStores
);

export default router;