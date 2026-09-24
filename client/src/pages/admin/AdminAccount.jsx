import { useAuth } from "../../context/AuthContext";

import "./AdminAccount.css";

const AdminAccount = () => {
   const { user } = useAuth();

   return (
      <section className="admin-account">
         <div className="admin-account-header">
            <div>
               <p className="admin-account-eyebrow">
                  ACCOUNT
               </p>

               <h1>My Account</h1>

               <p>
                  View your administrator account details.
               </p>
            </div>
         </div>

         <div className="admin-account-card">
            <div className="admin-account-row">
               <span className="admin-account-label">
                  Name
               </span>

               <span className="admin-account-value">
                  {user?.name || "—"}
               </span>
            </div>

            <div className="admin-account-row">
               <span className="admin-account-label">
                  Email
               </span>

               <span className="admin-account-value">
                  {user?.email || "—"}
               </span>
            </div>

            <div className="admin-account-row">
               <span className="admin-account-label">
                  Address
               </span>

               <span className="admin-account-value">
                  {user?.address || "—"}
               </span>
            </div>

            <div className="admin-account-row">
               <span className="admin-account-label">
                  Role
               </span>

               <span className="admin-account-role">
                  {user?.role || "ADMIN"}
               </span>
            </div>
         </div>
      </section>
   );
};

export default AdminAccount;