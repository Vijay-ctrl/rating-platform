import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getStores } from "../../services/userService";
import { submitRating } from "../../services/ratingService";

import RatingModal from "../../components/RatingModal";
import ChangePassword from "../../components/ChangePassword";

import "./UserStores.css";

const UserStores = () => {
   const { token } = useAuth();

   const [stores, setStores] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const [filters, setFilters] = useState({
      name: "",
      address: "",
   });

   const [appliedFilters, setAppliedFilters] = useState({
      name: "",
      address: "",
   });

   const [selectedStore, setSelectedStore] = useState(null);
   const [ratingLoading, setRatingLoading] = useState(false);
   const [ratingError, setRatingError] = useState("");

   const loadStores = async (currentFilters = appliedFilters) => {
      try {
         setLoading(true);
         setError("");

         const response = await getStores(
            {
               name: currentFilters.name || undefined,
               address: currentFilters.address || undefined,
            },
            token
         );

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

      const nextFilters = {
         name: filters.name.trim(),
         address: filters.address.trim(),
      };

      setAppliedFilters(nextFilters);
      loadStores(nextFilters);
   };

   const handleClear = () => {
      const emptyFilters = {
         name: "",
         address: "",
      };

      setFilters(emptyFilters);
      setAppliedFilters(emptyFilters);
      loadStores(emptyFilters);
   };

   const handleOpenRating = (store) => {
      setSelectedStore(store);
      setRatingError("");
   };

   const handleCloseRating = () => {
      if (ratingLoading) {
         return;
      }

      setSelectedStore(null);
      setRatingError("");
   };

   const handleSubmitRating = async (rating) => {
      if (!selectedStore) {
         return;
      }

      try {
         setRatingLoading(true);
         setRatingError("");

         await submitRating(
            {
               storeId: selectedStore.id,
               rating,
            },
            token
         );

         setSelectedStore(null);

         await loadStores();
      } catch (error) {
         setRatingError(
            error.response?.data?.message ||
            "Unable to save your rating."
         );
      } finally {
         setRatingLoading(false);
      }
   };

   return (
      <section className="user-stores">
         <div className="user-stores-header">
            <div>
               <p className="user-stores-eyebrow">
                  USER WORKSPACE
               </p>

               <h1>Stores</h1>

               <p>
                  Browse stores and share your experience with a rating.
               </p>
            </div>
         </div>

         {error && (
            <div className="user-stores-error">
               {error}
            </div>
         )}

         <form
            className="user-stores-filters"
            onSubmit={handleSearch}
         >
            <div className="user-stores-filter-group">
               <label htmlFor="name">
                  Store Name
               </label>

               <input
                  id="name"
                  name="name"
                  type="text"
                  value={filters.name}
                  onChange={handleChange}
                  placeholder="Search by store name"
               />
            </div>

            <div className="user-stores-filter-group">
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

            <div className="user-stores-filter-actions">
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

         <div className="user-stores-card">
            {loading ? (
               <div className="user-stores-state">
                  Loading stores...
               </div>
            ) : stores.length === 0 ? (
               <div className="user-stores-state">
                  No stores found.
               </div>
            ) : (
               <div className="user-stores-table-wrapper">
                  <table className="user-stores-table">
                     <thead>
                        <tr>
                           <th>Store Name</th>
                           <th>Address</th>
                           <th>Overall Rating</th>
                           <th>Your Rating</th>
                           <th>Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {stores.map((store) => (
                           <tr key={store.id}>
                              <td>{store.name}</td>

                              <td>{store.address}</td>

                              <td>
                                 {store.totalRatings === 0
                                    ? "No ratings"
                                    : store.averageRating}
                              </td>

                              <td>
                                 {store.userRating ??
                                    "Not rated"}
                              </td>

                              <td>
                                 <button
                                    type="button"
                                    className="user-store-rating-button"
                                    onClick={() =>
                                       handleOpenRating(store)
                                    }
                                 >
                                    {store.userRating
                                       ? "Modify Rating"
                                       : "Submit Rating"}
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>

         {selectedStore && (
            <RatingModal
               store={selectedStore}
               onClose={handleCloseRating}
               onSubmit={handleSubmitRating}
               loading={ratingLoading}
               error={ratingError}
            />
         )}
         <ChangePassword />
      </section>
   );
};

export default UserStores;