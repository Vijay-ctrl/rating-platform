import {
   createUser,
   getDashboardStats,
   getUsers,
   getUserById,
   createStore,
   getStores,
} from "../services/adminService.mjs";

export const addUser = async (req, res, next) => {
   try {
      const user = await createUser(req.body);

      res.status(201).json({
         success: true,
         message: "User created successfully",
         data: {
            user,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const addAdmin = async (req, res, next) => {
   try {
      const admin = await createUser(req.body);

      res.status(201).json({
         success: true,
         message: "Administrator created successfully",
         data: {
            user: admin,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const dashboardStats = async (req, res, next) => {
   try {
      const stats = await getDashboardStats();

      res.status(200).json({
         success: true,
         data: stats,
      });
   } catch (error) {
      next(error);
   }
};

export const listUsers = async (req, res, next) => {
   try {
      const users = await getUsers(req.query);

      res.status(200).json({
         success: true,
         data: {
            users,
            count: users.length,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const userDetails = async (req, res, next) => {
   try {
      const userId = Number(req.params.id);

      if (!Number.isInteger(userId) || userId <= 0) {
         throw new AppError("Invalid user ID", 400);
      }

      const user = await getUserById(userId);

      res.status(200).json({
         success: true,
         data: {
            user,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const addStore = async (req, res, next) => {
   try {
      const store = await createStore(req.body);

      res.status(201).json({
         success: true,
         message: "Store created successfully",
         data: {
            store,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const addStoreOwner = async (req, res, next) => {
   try {
      const owner = await createUser(req.body);

      res.status(201).json({
         success: true,
         message: "Store owner created successfully",
         data: {
            user: owner,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const listStores = async (req, res, next) => {
   try {
      const stores = await getStores(req.query);

      res.status(200).json({
         success: true,
         data: {
            stores,
            count: stores.length,
         },
      });
   } catch (error) {
      next(error);
   }
};