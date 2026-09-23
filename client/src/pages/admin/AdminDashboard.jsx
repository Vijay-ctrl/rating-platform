import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/adminService";

import "./AdminDashboard.css";

const AdminDashboard = () => {
   const { token } = useAuth();

   const [stats, setStats] = useState({
      totalUsers: 0,
      totalStores: 0,
      totalRatings: 0,
   });

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const loadDashboardStats = async () => {
         try {
            setError("");

            const response = await getDashboardStats(token);

            setStats(response.data);
         } catch (error) {
            setError(
               error.response?.data?.message ||
               "Unable to load dashboard statistics."
            );
         } finally {
            setLoading(false);
         }
      };

      if (token) {
         loadDashboardStats();
      }
   }, [token]);

   return (
      <section className="admin-dashboard">
         <div className="admin-dashboard-header">
            <div>
               <p className="admin-dashboard-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Dashboard</h1>

               <p>
                  Monitor users, stores, and platform activity.
               </p>
            </div>
         </div>

         {error && (
            <div className="admin-dashboard-error">
               {error}
            </div>
         )}

         <div className="admin-stats-grid">
            <div className="admin-stat-card">
               <span className="admin-stat-label">
                  Total Users
               </span>

               <strong className="admin-stat-value">
                  {loading ? "—" : stats.totalUsers}
               </strong>

               <span className="admin-stat-description">
                  Registered platform users
               </span>
            </div>

            <div className="admin-stat-card">
               <span className="admin-stat-label">
                  Total Stores
               </span>

               <strong className="admin-stat-value">
                  {loading ? "—" : stats.totalStores}
               </strong>

               <span className="admin-stat-description">
                  Stores available on platform
               </span>
            </div>

            <div className="admin-stat-card">
               <span className="admin-stat-label">
                  Total Ratings
               </span>

               <strong className="admin-stat-value">
                  {loading ? "—" : stats.totalRatings}
               </strong>

               <span className="admin-stat-description">
                  Ratings submitted by users
               </span>
            </div>
         </div>
      </section>
   );
};

export default AdminDashboard;