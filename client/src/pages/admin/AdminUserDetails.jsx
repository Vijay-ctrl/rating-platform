import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getUserDetails } from "../../services/adminService";

import "./AdminUserDetails.css";

const AdminUserDetails = () => {
   const { userId } = useParams();
   const navigate = useNavigate();
   const { token } = useAuth();

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const loadUserDetails = async () => {
         try {
            setLoading(true);
            setError("");

            const response = await getUserDetails(userId, token);

            setUser(response.data.user);
         } catch (error) {
            setError(
               error.response?.data?.message ||
               "Unable to load user details."
            );
         } finally {
            setLoading(false);
         }
      };

      if (token && userId) {
         loadUserDetails();
      }
   }, [token, userId]);

   if (loading) {
      return (
         <section className="admin-user-details">
            <div className="admin-user-details-state">
               Loading user details...
            </div>
         </section>
      );
   }

   if (error) {
      return (
         <section className="admin-user-details">
            <div className="admin-user-details-error">
               {error}
            </div>

            <button
               type="button"
               className="admin-user-details-back"
               onClick={() => navigate("/admin/users")}
            >
               Back to Users
            </button>
         </section>
      );
   }

   return (
      <section className="admin-user-details">
         <div className="admin-user-details-header">
            <div>
               <p className="admin-user-details-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>User Details</h1>

               <p>
                  View information and role details for this user.
               </p>
            </div>

            <button
               type="button"
               className="admin-user-details-back"
               onClick={() => navigate("/admin/users")}
            >
               Back to Users
            </button>
         </div>

         <div className="admin-user-details-card">
            <div className="admin-user-detail">
               <span>Name</span>
               <strong>{user.name}</strong>
            </div>

            <div className="admin-user-detail">
               <span>Email</span>
               <strong>{user.email}</strong>
            </div>

            <div className="admin-user-detail">
               <span>Address</span>
               <strong>{user.address}</strong>
            </div>

            <div className="admin-user-detail">
               <span>Role</span>
               <strong>{user.role}</strong>
            </div>

            {user.role === "STORE_OWNER" && (
               <div className="admin-user-detail">
                  <span>Rating</span>
                  <strong>
                     {user.store?.averageRating ?? "No ratings yet"}
                  </strong>
               </div>
            )}
         </div>
      </section>
   );
};

export default AdminUserDetails;