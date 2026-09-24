import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

const Login = () => {
   const navigate = useNavigate();
   const { login } = useAuth();

   const [formData, setFormData] = useState({
      email: "",
      password: "",
      role: "",
   });

   const [error, setError] = useState("");
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

      if (!formData.role) {
         setError("Please select how you want to login.");
         return;
      }

      setLoading(true);

      try {
         const loggedInUser = await login(formData);

         console.log("LOGGED IN USER:", loggedInUser);
         console.log("SELECTED ROLE:", formData.role);

         if (loggedInUser.role === "ADMIN") {
            navigate("/admin");
         } else if (loggedInUser.role === "USER") {
            navigate("/user");
         } else if (loggedInUser.role === "STORE_OWNER") {
            navigate("/owner");
         }
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Unable to login. Please try again."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="login-page">
         <div className="login-card">
            <div className="login-header">
               <p className="login-eyebrow">
                  RATING PLATFORM
               </p>

               <h1>Welcome back</h1>

               <p>
                  Sign in to continue to your dashboard.
               </p>
            </div>

            {error && (
               <div className="login-error">
                  {error}
               </div>
            )}

            <form
               className="login-form"
               onSubmit={handleSubmit}
            >
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
                  <label htmlFor="password">
                     Password
                  </label>

                  <input
                     id="password"
                     name="password"
                     type="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Enter your password"
                     required
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="role">
                     Login as
                  </label>

                  <select
                     id="role"
                     name="role"
                     value={formData.role}
                     onChange={handleChange}
                     required
                  >
                     <option value="" disabled>
                        Select your role
                     </option>

                     <option value="USER">
                        User
                     </option>

                     <option value="ADMIN">
                        Admin
                     </option>

                     <option value="STORE_OWNER">
                        Store Owner
                     </option>
                  </select>
               </div>

               <button
                  type="submit"
                  disabled={loading}
               >
                  {loading
                     ? "Signing in..."
                     : "Sign In"}
               </button>
            </form>

            <div className="login-footer">
               <span>
                  Don't have an account?
               </span>

               <button
                  type="button"
                  onClick={() => navigate("/register")}
               >
                  Create account
               </button>
            </div>
         </div>
      </div>
   );
};

export default Login;