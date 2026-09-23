import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getStores } from "../../services/adminService";

import "./AdminStores.css";

const AdminStores = () => {
   const navigate = useNavigate();
   const { token } = useAuth();

   const [stores, setStores] = useState([]);

   const [filters, setFilters] = useState({
      name: "",
      email: "",
      address: "",
   });

   const [sort, setSort] = useState({
      field: "name",
      order: "asc",
   });

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const loadStores = async (
      currentFilters = filters,
      currentSort = sort
   ) => {
      try {
         setLoading(true);
         setError("");

         const params = {
            sortBy: currentSort.field,
            sortOrder: currentSort.order,
         };

         if (currentFilters.name.trim()) {
            params.name = currentFilters.name.trim();
         }

         if (currentFilters.email.trim()) {
            params.email = currentFilters.email.trim();
         }

         if (currentFilters.address.trim()) {
            params.address = currentFilters.address.trim();
         }

         const response = await getStores(params, token);

         setStores(response.data.stores || []);
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Unable to load stores."
         );
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (token) {
         loadStores();
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
      loadStores(filters, sort);
   };

   const handleClear = () => {
      const clearedFilters = {
         name: "",
         email: "",
         address: "",
      };

      setFilters(clearedFilters);
      loadStores(clearedFilters, sort);
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
      loadStores(filters, nextSort);
   };

   return (
      <section className="admin-stores">
         <div className="admin-stores-header">
            <div>
               <p className="admin-stores-eyebrow">
                  ADMINISTRATION
               </p>

               <h1>Stores</h1>

               <p>
                  Manage stores and monitor their overall ratings.
               </p>
            </div>

            <button
               type="button"
               className="admin-stores-add-button"
               onClick={() => navigate("/admin/stores/add")}
            >
               + Add Store
            </button>
         </div>

         <form
            className="admin-stores-filters"
            onSubmit={handleSearch}
         >
            <div className="admin-stores-filter-group">
               <label htmlFor="store-name">Name</label>

               <input
                  id="store-name"
                  name="name"
                  type="text"
                  value={filters.name}
                  onChange={handleChange}
                  placeholder="Search by name"
               />
            </div>

            <div className="admin-stores-filter-group">
               <label htmlFor="store-email">Email</label>

               <input
                  id="store-email"
                  name="email"
                  type="text"
                  value={filters.email}
                  onChange={handleChange}
                  placeholder="Search by email"
               />
            </div>

            <div className="admin-stores-filter-group">
               <label htmlFor="store-address">Address</label>

               <input
                  id="store-address"
                  name="address"
                  type="text"
                  value={filters.address}
                  onChange={handleChange}
                  placeholder="Search by address"
               />
            </div>

            <div className="admin-stores-filter-actions">
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
            <div className="admin-stores-error">
               {error}
            </div>
         )}

         <div className="admin-stores-card">
            {loading ? (
               <div className="admin-stores-state">
                  Loading stores...
               </div>
            ) : stores.length === 0 ? (
               <div className="admin-stores-state">
                  No stores found.
               </div>
            ) : (
               <div className="admin-stores-table-wrapper">
                  <table className="admin-stores-table">
                     <thead>
                        <tr>
                           <th>
                              <button
                                 type="button"
                                 className="admin-stores-sort-button"
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
                                 className="admin-stores-sort-button"
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
                                 className="admin-stores-sort-button"
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
                                 className="admin-stores-sort-button"
                                 onClick={() => handleSort("rating")}
                              >
                                 Rating
                                 <span>
                                    {sort.field === "rating"
                                       ? sort.order === "asc"
                                          ? " ↑"
                                          : " ↓"
                                       : ""}
                                 </span>
                              </button>
                           </th>
                        </tr>
                     </thead>

                     <tbody>
                        {stores.map((store) => (
                           <tr key={store.id}>
                              <td>{store.name}</td>
                              <td>{store.email}</td>
                              <td>{store.address}</td>
                              <td>
                                 {store.totalRatings === 0
                                    ? "No ratings"
                                    : store.averageRating}
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

export default AdminStores;