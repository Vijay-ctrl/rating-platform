import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { createStore } from "../../services/adminService";

import "./AddStore.css";

const AddStore = () => {
   const { token } = useAuth();
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      ownerId: "",
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

         if (!formData.ownerId.trim()) {
            setError("Store Owner ID is required.");
            setLoading(false);
            return;
         }

         const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            ownerId: Number(formData.ownerId),
         };

         await createStore(payload, token);

         setSuccess("Store created successfully.");

         setFormData({
            name: "",
            email: "",
            address: "",
            ownerId: "",
         });
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Unable to create store."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="add-store">
         <div className="add-store-header">
            <div>
               <p className="add-store-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Add Store</h1>

               <p>
                  Create a new store on the rating platform.
               </p>
            </div>

            <button
               type="button"
               className="add-store-back"
               onClick={() => navigate("/admin/stores")}
            >
               Back to Stores
            </button>
         </div>

         {error && (
            <div className="add-store-error">
               {error}
            </div>
         )}

         {success && (
            <div className="add-store-success">
               {success}
            </div>
         )}

         <form
            className="add-store-form"
            onSubmit={handleSubmit}
         >
            <div className="add-store-field">
               <label htmlFor="name">
                  Store Name
               </label>

               <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter store name"
                  required
               />
            </div>

            <div className="add-store-field">
               <label htmlFor="email">
                  Store Email
               </label>

               <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter store email"
                  required
               />
            </div>

            <div className="add-store-field add-store-field-full">
               <label htmlFor="address">
                  Address
               </label>

               <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter store address"
                  rows="4"
                  required
               />
            </div>

            <div className="add-store-field">
               <label htmlFor="ownerId">
                  Store Owner ID
               </label>

               <input
                  id="ownerId"
                  name="ownerId"
                  type="number"
                  min="1"
                  value={formData.ownerId}
                  onChange={handleChange}
                  placeholder="Enter store owner ID"
                  required
               />

               <span className="add-store-field-hint">
                  Each store must have a unique store owner.
               </span>
            </div>

            <div className="add-store-actions">
               <button
                  type="button"
                  className="add-store-cancel"
                  onClick={() => navigate("/admin/stores")}
               >
                  Cancel
               </button>

               <button
                  type="submit"
                  className="add-store-submit"
                  disabled={loading}
               >
                  {loading ? "Creating..." : "Create Store"}
               </button>
            </div>
         </form>
      </section>
   );
};

export default AddStore;