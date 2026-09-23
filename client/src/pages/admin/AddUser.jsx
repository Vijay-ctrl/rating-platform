import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { createUser } from "../../services/adminService";

import "./AddUser.css";

const AddUser = () => {
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
            role: "USER",
         };

         const response = await createUser(payload, token);

         setSuccess(
            `User created successfully. User ID: ${response.data.user.id}`
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
            "Unable to create user."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="add-user">
         <div className="add-user-header">
            <div>
               <p className="add-user-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Add User</h1>

               <p>
                  Create a new normal user for the rating platform.
               </p>
            </div>

            <button
               type="button"
               className="add-user-back"
               onClick={() => navigate("/admin/users")}
            >
               Back to Users
            </button>
         </div>

         {error && (
            <div className="add-user-error">
               {error}
            </div>
         )}

         {success && (
            <div className="add-user-success">
               {success}
            </div>
         )}

         <form
            className="add-user-form"
            onSubmit={handleSubmit}
         >
            <div className="add-user-field">
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
                  maxLength={100}
               />
            </div>

            <div className="add-user-field">
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

            <div className="add-user-field add-user-field-full">
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
                  maxLength={600}
               />
            </div>

            <div className="add-user-field">
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

               <span className="add-user-field-hint">
                  8–16 characters, including at least one uppercase
                  letter and one special character.
               </span>
            </div>

            <div className="add-user-actions">
               <button
                  type="button"
                  className="add-user-cancel"
                  onClick={() => navigate("/admin/users")}
               >
                  Cancel
               </button>

               <button
                  type="submit"
                  className="add-user-submit"
                  disabled={loading}
               >
                  {loading ? "Creating..." : "Create User"}
               </button>
            </div>
         </form>
      </section>
   );
};

export default AddUser;