import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Register.css";

const Register = () => {
   const navigate = useNavigate();
   const { register } = useAuth();

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      address: "",
      password: "",
      role: "",
   });

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormData((previous) => ({
         ...previous,
         [name]: value,
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      if (!formData.role) {
         setError("Please select an account type.");
         return;
      }

      setLoading(true);

      try {
         await register(formData);

         setSuccess(
            "Account created successfully. You can now sign in."
         );

         setFormData({
            name: "",
            email: "",
            address: "",
            password: "",
            role: "",
         });
      } catch (error) {
         const validationErrors =
            error.response?.data?.errors;

         if (validationErrors?.length) {
            setError(validationErrors[0].message);
         } else {
            setError(
               error.response?.data?.message ||
               "Unable to create your account. Please try again."
            );
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="register-page">
         <div className="register-card">
            <div className="register-header">
               <p className="register-eyebrow">
                  RATING PLATFORM
               </p>

               <h1>Create your account</h1>

               <p>
                  Create an account to access the platform.
               </p>
            </div>

            {error && (
               <div className="register-error">
                  {error}
               </div>
            )}

            {success && (
               <div className="register-success">
                  {success}
               </div>
            )}

            <form
               className="register-form"
               onSubmit={handleSubmit}
            >
               <div className="form-group">
                  <label htmlFor="role">
                     Create account as
                  </label>

                  <select
                     id="role"
                     name="role"
                     value={formData.role}
                     onChange={handleChange}
                     required
                  >
                     <option value="" disabled>
                        Select account type
                     </option>

                     <option value="USER">
                        User
                     </option>

                     <option value="ADMIN">
                        Admin
                     </option>
                  </select>
               </div>

               <div className="form-group">
                  <label htmlFor="name">
                     Full Name
                  </label>

                  <input
                     id="name"
                     name="name"
                     type="text"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Enter your full name"
                     required
                  />

                  <span className="field-hint">
                     20–60 characters
                  </span>
               </div>

               <div className="form-group">
                  <label htmlFor="email">
                     Email
                  </label>

                  <input
                     id="email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Enter your email"
                     required
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="address">
                     Address
                  </label>

                  <textarea
                     id="address"
                     name="address"
                     value={formData.address}
                     onChange={handleChange}
                     placeholder="Enter your address"
                     rows="3"
                     maxLength="400"
                     required
                  />

                  <span className="field-hint">
                     Maximum 400 characters
                  </span>
               </div>

               <div className="form-group">
                  <label htmlFor="password">
                     Password
                  </label>

                  <input
                     id="password"
                     name="password"
                     type="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Create a password"
                     required
                  />

                  <span className="field-hint">
                     8–16 characters, 1 uppercase letter and
                     1 special character
                  </span>
               </div>

               <button
                  type="submit"
                  disabled={loading}
               >
                  {loading
                     ? "Creating account..."
                     : "Create Account"}
               </button>
            </form>

            <div className="register-footer">
               <span>
                  Already have an account?
               </span>

               <button
                  type="button"
                  onClick={() => navigate("/login")}
               >
                  Sign in
               </button>
            </div>
         </div>
      </div>
   );
};

export default Register;