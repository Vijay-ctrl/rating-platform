import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import errorHandler from "./middleware/errorHandler.mjs";
import ratingRoutes from "./routes/ratingRoutes.mjs";
import ownerRoutes from "./routes/ownerRoutes.mjs";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/api/health", (req, res) => {
   res.json({
      success: true,
      message: "Rating Platform API is running",
   });
});

app.use(errorHandler);

export default app;