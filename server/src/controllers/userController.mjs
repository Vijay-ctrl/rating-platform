import { getStoresForUser } from "../services/userService.mjs";

export const listStores = async (req, res, next) => {
   try {
      const stores = await getStoresForUser(
         req.query,
         req.user.userId
      );

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