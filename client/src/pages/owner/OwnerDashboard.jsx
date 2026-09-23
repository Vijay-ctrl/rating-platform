import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getOwnerDashboard } from "../../services/ownerService";
import ChangePassword from "../../components/ChangePassword";

import "./OwnerDashboard.css";

const OwnerDashboard = () => {
   const { token } = useAuth();

   const [dashboard, setDashboard] = useState({
      store: null,
      averageRating: 0,
      totalRatings: 0,
      users: [],
   });

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const loadDashboard = async () => {
         try {
            setLoading(true);
            setError("");

            const response = await getOwnerDashboard(token);

            const data = response.data;

            setDashboard({
               store: data.store || null,
               averageRating: data.averageRating || 0,
               totalRatings: data.totalRatings || 0,
               users: Array.isArray(data.users) ? data.users : [],
            });
         } catch (error) {
            setError(
               error.response?.data?.message ||
               "Unable to load owner dashboard."
            );
         } finally {
            setLoading(false);
         }
      };

      if (token) {
         loadDashboard();
      }
   }, [token]);

   if (loading) {
      return (
         <section className="owner-dashboard">
            <div className="owner-dashboard-state">
               Loading dashboard...
            </div>
         </section>
      );
   }

   return (
      <section className="owner-dashboard">
         <div className="owner-dashboard-header">
            <div>
               <p className="owner-dashboard-eyebrow">
                  STORE OWNER
               </p>

               <h1>Dashboard</h1>

               <p>
                  Monitor ratings and customer activity for your store.
               </p>
            </div>
         </div>

         {error && (
            <div className="owner-dashboard-error">
               {error}
            </div>
         )}

         {!error && (
            <>
               <div className="owner-store-card">
                  <div>
                     <span className="owner-store-label">
                        STORE
                     </span>

                     <h2>
                        {dashboard.store?.name || "Store"}
                     </h2>

                     <p>
                        {dashboard.store?.address || "Address unavailable"}
                     </p>
                  </div>

                  <div className="owner-store-rating">
                     <span>Average Rating</span>

                     <strong>
                        {dashboard.averageRating || "—"}
                     </strong>

                     <small>
                        {dashboard.totalRatings}{" "}
                        {dashboard.totalRatings === 1
                           ? "rating"
                           : "ratings"}
                     </small>
                  </div>
               </div>

               <div className="owner-stats-grid">
                  <div className="owner-stat-card">
                     <span className="owner-stat-label">
                        Average Rating
                     </span>

                     <strong className="owner-stat-value">
                        {dashboard.averageRating || "—"}
                     </strong>

                     <span className="owner-stat-description">
                        Customer rating average
                     </span>
                  </div>

                  <div className="owner-stat-card">
                     <span className="owner-stat-label">
                        Total Ratings
                     </span>

                     <strong className="owner-stat-value">
                        {dashboard.totalRatings}
                     </strong>

                     <span className="owner-stat-description">
                        Ratings submitted by users
                     </span>
                  </div>

                  <div className="owner-stat-card">
                     <span className="owner-stat-label">
                        Customers
                     </span>

                     <strong className="owner-stat-value">
                        {dashboard.users.length}
                     </strong>

                     <span className="owner-stat-description">
                        Users who submitted ratings
                     </span>
                  </div>
               </div>

               <div className="owner-users-card">
                  <div className="owner-users-header">
                     <div>
                        <p className="owner-users-eyebrow">
                           CUSTOMER ACTIVITY
                        </p>

                        <h2>Users Who Rated Your Store</h2>
                     </div>

                     <span className="owner-users-count">
                        {dashboard.users.length}
                     </span>
                  </div>

                  {dashboard.users.length === 0 ? (
                     <div className="owner-dashboard-state">
                        No users have submitted ratings yet.
                     </div>
                  ) : (
                     <div className="owner-users-table-wrapper">
                        <table className="owner-users-table">
                           <thead>
                              <tr>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Address</th>
                                 <th>Rating</th>
                              </tr>
                           </thead>

                           <tbody>
                              {dashboard.users.map((user) => (
                                 <tr key={user.id}>
                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.address}</td>

                                    <td>
                                       <span className="owner-rating-badge">
                                          {user.rating}
                                       </span>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  )}
               </div>
            </>
         )}
         <ChangePassword />
      </section>
   );
};

export default OwnerDashboard;