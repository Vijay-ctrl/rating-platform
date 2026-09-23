import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { createAdmin } from "../../services/adminService";

import "./AddAdmin.css";

const AddAdmin = () => {
   const { token } = useAuth();
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      password: "",
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

         const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            password: formData.password,
            role: "ADMIN",
         };

         const response = await createAdmin(payload, token);

         setSuccess(
            `Admin created successfully. Admin ID: ${response.data.user.id}`
         );

         setFormData({
            name: "",
            email: "",
            address: "",
            password: "",
         });
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Unable to create admin."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="add-admin">
         <div className="add-admin-header">
            <div>
               <p className="add-admin-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Add Admin</h1>

               <p>
                  Create a new system administrator for the rating platform.
               </p>
            </div>

            <button
               type="button"
               className="add-admin-back"
               onClick={() => navigate("/admin/users")}
            >
               Back to Users
            </button>
         </div>

         {error && (
            <div className="add-admin-error">
               {error}
            </div>
         )}

         {success && (
            <div className="add-admin-success">
               {success}
            </div>
         )}

         <form
            className="add-admin-form"
            onSubmit={handleSubmit}
         >
            <div className="add-admin-field">
               <label htmlFor="name">
                  Name
               </label>

               <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  minLength={20}
                  maxLength={60}
               />
            </div>

            <div className="add-admin-field">
               <label htmlFor="email">
                  Email
               </label>

               <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
               />
            </div>

            <div className="add-admin-field add-admin-field-full">
               <label htmlFor="address">
                  Address
               </label>

               <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  rows="4"
                  required
                  maxLength={400}
               />
            </div>

            <div className="add-admin-field">
               <label htmlFor="password">
                  Password
               </label>

               <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  minLength={8}
                  maxLength={16}
               />

               <span className="add-admin-field-hint">
                  8–16 characters, including at least one uppercase
                  letter and one special character.
               </span>
            </div>

            <div className="add-admin-actions">
               <button
                  type="button"
                  className="add-admin-cancel"
                  onClick={() => navigate("/admin/users")}
               >
                  Cancel
               </button>

               <button
                  type="submit"
                  className="add-admin-submit"
                  disabled={loading}
               >
                  {loading ? "Creating..." : "Create Admin"}
               </button>
            </div>
         </form>
      </section>
   );
};

export default AddAdmin;