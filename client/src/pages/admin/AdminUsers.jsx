import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getUsers } from "../../services/adminService";

import "./AdminUsers.css";

const AdminUsers = () => {
   const { token } = useAuth();
   const navigate = useNavigate();

   const [users, setUsers] = useState([]);

   const [filters, setFilters] = useState({
      name: "",
      email: "",
      address: "",
      role: "",
   });

   const [sort, setSort] = useState({
      field: "name",
      order: "asc",
   });

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const loadUsers = async (
      currentFilters = filters,
      currentSort = sort
   ) => {
      try {
         setLoading(true);
         setError("");

         const params = {};

         params.sortBy = currentSort.field;
         params.sortOrder = currentSort.order;

         if (currentFilters.name.trim()) {
            params.name = currentFilters.name.trim();
         }

         if (currentFilters.email.trim()) {
            params.email = currentFilters.email.trim();
         }

         if (currentFilters.address.trim()) {
            params.address = currentFilters.address.trim();
         }

         if (currentFilters.role) {
            params.role = currentFilters.role;
         }

         const response = await getUsers(params, token);

         setUsers(response.data.users || []);
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Unable to load users."
         );
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (token) {
         loadUsers();
      }
   }, [token]);

   const handleChange = (event) => {
      const { name, value } = event.target;

      setFilters((previous) => ({
         ...previous,
         [name]: value,
      }));
   };

   const handleSearch = (event) => {
      event.preventDefault();
      loadUsers(filters, sort);
   };

   const handleClear = () => {
      const clearedFilters = {
         name: "",
         email: "",
         address: "",
         role: "",
      };

      setFilters(clearedFilters);
      loadUsers(clearedFilters, sort);
   };

   const handleSort = (field) => {
      const nextSort = {
         field,
         order:
            sort.field === field && sort.order === "asc"
               ? "desc"
               : "asc",
      };

      setSort(nextSort);
      loadUsers(filters, nextSort);
   };

   const handleViewUser = (userId) => {
      navigate(`/admin/users/${userId}`);
   };

   const handleAddStoreOwner = () => {
      navigate("/admin/users/store-owner/add");
   };

   const handleAddAdmin = () => {
      navigate("/admin/users/add-admin");
   };

   const handleAddUser = () => {
      navigate("/admin/users/add");
   };

   return (
      <section className="admin-users">
         <div className="admin-users-header">
            <div>
               <p className="admin-users-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Users</h1>

               <p>
                  Manage platform users and their roles.
               </p>
            </div>

            <div className="admin-users-header-actions">
               <button
                  type="button"
                  className="admin-users-add-user-button"
                  onClick={handleAddUser}
               >
                  + Add User
               </button>

               <button
                  type="button"
                  className="admin-users-add-admin-button"
                  onClick={handleAddAdmin}
               >
                  + Add Admin
               </button>

               <button
                  type="button"
                  className="admin-users-add-owner-button"
                  onClick={handleAddStoreOwner}
               >
                  + Add Store Owner
               </button>
            </div>
         </div>

         <form
            className="admin-users-filters"
            onSubmit={handleSearch}
         >
            <div className="admin-users-filter-group">
               <label htmlFor="name">
                  Name
               </label>

               <input
                  id="name"
                  name="name"
                  type="text"
                  value={filters.name}
                  onChange={handleChange}
                  placeholder="Search by name"
               />
            </div>

            <div className="admin-users-filter-group">
               <label htmlFor="email">
                  Email
               </label>

               <input
                  id="email"
                  name="email"
                  type="text"
                  value={filters.email}
                  onChange={handleChange}
                  placeholder="Search by email"
               />
            </div>

            <div className="admin-users-filter-group">
               <label htmlFor="address">
                  Address
               </label>

               <input
                  id="address"
                  name="address"
                  type="text"
                  value={filters.address}
                  onChange={handleChange}
                  placeholder="Search by address"
               />
            </div>

            <div className="admin-users-filter-group">
               <label htmlFor="role">
                  Role
               </label>

               <select
                  id="role"
                  name="role"
                  value={filters.role}
                  onChange={handleChange}
               >
                  <option value="">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">Normal User</option>
                  <option value="STORE_OWNER">Store Owner</option>
               </select>
            </div>

            <div className="admin-users-filter-actions">
               <button type="submit">
                  Search
               </button>

               <button
                  type="button"
                  onClick={handleClear}
               >
                  Clear
               </button>
            </div>
         </form>

         {error && (
            <div className="admin-users-error">
               {error}
            </div>
         )}

         <div className="admin-users-card">
            {loading ? (
               <div className="admin-users-state">
                  Loading users...
               </div>
            ) : users.length === 0 ? (
               <div className="admin-users-state">
                  No users found.
               </div>
            ) : (
               <div className="admin-users-table-wrapper">
                  <table className="admin-users-table">
                     <thead>
                        <tr>
                           <th>
                              <button
                                 type="button"
                                 className="admin-sort-button"
                                 onClick={() => handleSort("name")}
                              >
                                 Name
                                 <span>
                                    {sort.field === "name"
                                       ? sort.order === "asc"
                                          ? " ↑"
                                          : " ↓"
                                       : ""}
                                 </span>
                              </button>
                           </th>

                           <th>
                              <button
                                 type="button"
                                 className="admin-sort-button"
                                 onClick={() => handleSort("email")}
                              >
                                 Email
                                 <span>
                                    {sort.field === "email"
                                       ? sort.order === "asc"
                                          ? " ↑"
                                          : " ↓"
                                       : ""}
                                 </span>
                              </button>
                           </th>

                           <th>
                              <button
                                 type="button"
                                 className="admin-sort-button"
                                 onClick={() => handleSort("address")}
                              >
                                 Address
                                 <span>
                                    {sort.field === "address"
                                       ? sort.order === "asc"
                                          ? " ↑"
                                          : " ↓"
                                       : ""}
                                 </span>
                              </button>
                           </th>

                           <th>
                              <button
                                 type="button"
                                 className="admin-sort-button"
                                 onClick={() => handleSort("role")}
                              >
                                 Role
                                 <span>
                                    {sort.field === "role"
                                       ? sort.order === "asc"
                                          ? " ↑"
                                          : " ↓"
                                       : ""}
                                 </span>
                              </button>
                           </th>

                           <th>Actions</th>
                        </tr>
                     </thead>

                     <tbody>
                        {users.map((user) => (
                           <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.address}</td>
                              <td>{user.role}</td>

                              <td>
                                 <button
                                    type="button"
                                    className="admin-user-view-button"
                                    onClick={() =>
                                       handleViewUser(user.id)
                                    }
                                 >
                                    View
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </section>
   );
};

export default AdminUsers;