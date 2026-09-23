import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { updatePassword } from "../services/authService";

import "./ChangePassword.css";

const ChangePassword = () => {
   const { token } = useAuth();

   const [formData, setFormData] = useState({
      currentPassword: "",
      newPassword: "",
   });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormData((previous) => ({
         ...previous,
         [name]: value,
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         setLoading(true);
         setError("");
         setSuccess("");

         await updatePassword(formData, token);

         setSuccess("Password updated successfully.");

         setFormData({
            currentPassword: "",
            newPassword: "",
         });
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Unable to update password."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="change-password">
         <div className="change-password-header">
            <p className="change-password-eyebrow">
               ACCOUNT SECURITY
            </p>

            <h2>Change Password</h2>

            <p>
               Update your account password securely.
            </p>
         </div>

         {error && (
            <div className="change-password-error">
               {error}
            </div>
         )}

         {success && (
            <div className="change-password-success">
               {success}
            </div>
         )}

         <form
            className="change-password-form"
            onSubmit={handleSubmit}
         >
            <div className="change-password-field">
               <label htmlFor="currentPassword">
                  Current Password
               </label>

               <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  required
               />
            </div>

            <div className="change-password-field">
               <label htmlFor="newPassword">
                  New Password
               </label>

               <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                  minLength={8}
                  maxLength={16}
               />

               <span className="change-password-hint">
                  8–16 characters, including at least one uppercase
                  letter and one special character.
               </span>
            </div>

            <button
               type="submit"
               className="change-password-submit"
               disabled={loading}
            >
               {loading ? "Updating..." : "Update Password"}
            </button>
         </form>
      </section>
   );
};

export default ChangePassword;