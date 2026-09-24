import { z } from "zod";

const passwordSchema = z
   .string()
   .min(8, "Password must be at least 8 characters long")
   .max(16, "Password must not exceed 16 characters")
   .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
   )
   .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
   );

export const registerSchema = z.object({
   name: z
      .string()
      .trim()
      .min(20, "Name must be at least 20 characters long")
      .max(60, "Name must not exceed 60 characters"),

   email: z
      .string()
      .trim()
      .email("Please provide a valid email address"),

   address: z
      .string()
      .trim()
      .min(1, "Address is required")
      .max(400, "Address must not exceed 400 characters"),

   password: passwordSchema,

   role: z.enum(
      ["ADMIN", "USER"],
      {
         message: "Please select a valid account type",
      }
   ),
});

export const loginSchema = z.object({
   email: z
      .string()
      .trim()
      .email("Please provide a valid email address"),

   password: z
      .string()
      .min(1, "Password is required"),

   role: z.enum(
      ["ADMIN", "USER", "STORE_OWNER"],
      {
         message: "Please select a valid login role",
      }
   ),
});

export const updatePasswordSchema = z.object({
   currentPassword: z
      .string()
      .min(1, "Current password is required"),

   newPassword: passwordSchema,
});