import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserDetails from "../pages/admin/AdminUserDetails";
import AdminStores from "../pages/admin/AdminStores";
import AddStore from "../pages/admin/AddStore";
import AddStoreOwner from "../pages/admin/AddStoreOwner";
import UserStores from "../pages/user/UserStores";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AddUser from "../pages/admin/AddUser";
import AddAdmin from "../pages/admin/AddAdmin";

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/login" element={<Login />} />

         <Route path="/register" element={<Register />} />

         <Route
            element={
               <ProtectedRoute allowedRoles={["ADMIN"]} />
            }
         >
            <Route element={<DashboardLayout />}>
               <Route
                  path="/admin"
                  element={<AdminDashboard />}
               />
               <Route path="/admin/users/add" element={<AddUser />} />

               <Route
                  path="/admin/users/add-admin"
                  element={<AddAdmin />}
               />

               <Route path="/admin/users" element={<AdminUsers />} />

               <Route
                  path="/admin/users/:userId"
                  element={<AdminUserDetails />}
               />

               <Route
                  path="/admin/users/store-owner/add"
                  element={<AddStoreOwner />}
               />

               <Route path="/admin/stores" element={<AdminStores />} />

               <Route path="/admin/stores/add" element={<AddStore />} />

            </Route>
         </Route>

         <Route
            element={
               <ProtectedRoute allowedRoles={["USER"]} />
            }
         >
            <Route element={<DashboardLayout />}>
               <Route path="/user" element={<UserStores />} />
            </Route>
         </Route>

         <Route
            element={
               <ProtectedRoute
                  allowedRoles={["STORE_OWNER"]}
               />
            }
         >
            <Route element={<ProtectedRoute allowedRoles={["STORE_OWNER"]} />}>
               <Route element={<DashboardLayout />}>
                  <Route path="/owner" element={<OwnerDashboard />} />
               </Route>
            </Route>
         </Route>

         <Route
            path="/unauthorized"
            element={<div>Unauthorized</div>}
         />

         <Route
            path="*"
            element={<Navigate to="/login" replace />}
         />
      </Routes>
   );
};

export default AppRoutes;