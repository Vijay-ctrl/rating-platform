import { submitRating } from "../services/ratingService.mjs";

export const rateStore = async (req, res, next) => {
   try {
      const rating = await submitRating({
         userId: req.user.userId,
         storeId: req.body.storeId,
         rating: req.body.rating,
      });

      res.status(200).json({
         success: true,
         message: "Rating submitted successfully",
         data: {
            rating,
         },
      });
   } catch (error) {
      next(error);
   }
};