import { getOwnerDashboard } from "../services/ownerService.mjs";

export const ownerDashboard = async (req, res, next) => {
   try {
      const dashboard = await getOwnerDashboard(req.user.userId);

      res.status(200).json({
         success: true,
         data: dashboard,
      });
   } catch (error) {
      next(error);
   }
};