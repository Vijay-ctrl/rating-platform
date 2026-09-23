import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { createStoreOwner } from "../../services/adminService";

import "./AddStoreOwner.css";

const AddStoreOwner = () => {
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
            role: "STORE_OWNER",
         };

         const response = await createStoreOwner(payload, token);

         setSuccess(
            `Store owner created successfully. Owner ID: ${response.data.user.id}`
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
            "Unable to create store owner."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="add-store-owner">
         <div className="add-store-owner-header">
            <div>
               <p className="add-store-owner-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Add Store Owner</h1>

               <p>
                  Create a new store owner for the rating platform.
               </p>
            </div>

            <button
               type="button"
               className="add-store-owner-back"
               onClick={() => navigate("/admin/users")}
            >
               Back to Users
            </button>
         </div>

         {error && (
            <div className="add-store-owner-error">
               {error}
            </div>
         )}

         {success && (
            <div className="add-store-owner-success">
               {success}
            </div>
         )}

         <form
            className="add-store-owner-form"
            onSubmit={handleSubmit}
         >
            <div className="add-store-owner-field">
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

            <div className="add-store-owner-field">
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

            <div className="add-store-owner-field add-store-owner-field-full">
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

            <div className="add-store-owner-field">
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

               <span className="add-store-owner-field-hint">
                  8–16 characters, including at least one uppercase
                  letter and one special character.
               </span>
            </div>

            <div className="add-store-owner-actions">
               <button
                  type="button"
                  className="add-store-owner-cancel"
                  onClick={() => navigate("/admin/users")}
               >
                  Cancel
               </button>

               <button
                  type="submit"
                  className="add-store-owner-submit"
                  disabled={loading}
               >
                  {loading ? "Creating..." : "Create Store Owner"}
               </button>
            </div>
         </form>
      </section>
   );
};

export default AddStoreOwner;