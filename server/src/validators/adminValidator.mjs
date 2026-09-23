import { z } from "zod";

const passwordSchema = z
   .string()
   .min(8, "Password must be at least 8 characters long")
   .max(16, "Password must not exceed 16 characters")
   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
   .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
   );

const baseUserSchema = z.object({
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
});

export const createUserSchema = baseUserSchema.extend({
   role: z.literal("USER"),
});

export const createAdminSchema = baseUserSchema.extend({
   role: z.literal("ADMIN"),
});

export const createStoreOwnerSchema = baseUserSchema.extend({
   role: z.literal("STORE_OWNER"),
});

export const createStoreSchema = z.object({
   name: z
      .string()
      .trim()
      .min(20, "Store name must be at least 20 characters long")
      .max(60, "Store name must not exceed 60 characters"),

   email: z
      .string()
      .trim()
      .email("Please provide a valid email address"),

   address: z
      .string()
      .trim()
      .min(1, "Address is required")
      .max(400, "Address must not exceed 400 characters"),

   ownerId: z
      .number({
         error: "Owner ID must be a number",
      })
      .int("Owner ID must be an integer")
      .positive("Owner ID must be positive"),
});