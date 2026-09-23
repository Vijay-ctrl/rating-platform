import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.mjs";

const authMiddleware = (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
         throw new AppError("Authentication required", 401);
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
         userId: decoded.userId,
         role: decoded.role,
      };

      next();
   } catch (error) {
      if (error instanceof AppError) {
         return next(error);
      }

      if (error.name === "JsonWebTokenError") {
         return next(new AppError("Invalid authentication token", 401));
      }

      if (error.name === "TokenExpiredError") {
         return next(new AppError("Authentication token has expired", 401));
      }

      next(error);
   }
};

export default authMiddleware;