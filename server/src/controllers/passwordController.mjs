import { updatePassword } from "../services/passwordService.mjs";

export const changePassword = async (req, res, next) => {
   try {
      await updatePassword({
         userId: req.user.userId,
         currentPassword: req.body.currentPassword,
         newPassword: req.body.newPassword,
      });

      res.status(200).json({
         success: true,
         message: "Password updated successfully",
      });
   } catch (error) {
      next(error);
   }
};