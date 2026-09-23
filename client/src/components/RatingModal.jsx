import { useState } from "react";

import "./RatingModal.css";

const RatingModal = ({
   store,
   onClose,
   onSubmit,
   loading = false,
   error = "",
}) => {
   const [rating, setRating] = useState(store?.userRating || 0);
   const [hoverRating, setHoverRating] = useState(0);

   const isModify = Boolean(store?.userRating);

   const handleSubmit = (event) => {
      event.preventDefault();

      if (!rating) {
         return;
      }

      onSubmit(rating);
   };

   return (
      <div className="rating-modal-overlay" onMouseDown={onClose}>
         <div
            className="rating-modal"
            onMouseDown={(event) => event.stopPropagation()}
         >
            <div className="rating-modal-header">
               <div>
                  <p className="rating-modal-eyebrow">STORE RATING</p>

                  <h2>{isModify ? "Modify Rating" : "Submit Rating"}</h2>

                  <p className="rating-modal-store-name">
                     {store?.name}
                  </p>
               </div>

               <button
                  type="button"
                  className="rating-modal-close"
                  onClick={onClose}
                  disabled={loading}
                  aria-label="Close"
               >
                  ×
               </button>
            </div>

            <form onSubmit={handleSubmit}>
               <div className="rating-modal-content">
                  <p className="rating-modal-question">
                     How would you rate this store?
                  </p>

                  <div className="rating-stars">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <button
                           key={star}
                           type="button"
                           className={`rating-star ${star <= (hoverRating || rating)
                                 ? "rating-star-active"
                                 : ""
                              }`}
                           onClick={() => setRating(star)}
                           onMouseEnter={() => setHoverRating(star)}
                           onMouseLeave={() => setHoverRating(0)}
                           disabled={loading}
                           aria-label={`Rate ${star} out of 5`}
                        >
                           ★
                        </button>
                     ))}
                  </div>

                  <div className="rating-modal-value">
                     {rating ? `${rating} out of 5` : "Select a rating"}
                  </div>

                  {error && (
                     <div className="rating-modal-error">
                        {error}
                     </div>
                  )}
               </div>

               <div className="rating-modal-actions">
                  <button
                     type="button"
                     className="rating-modal-cancel"
                     onClick={onClose}
                     disabled={loading}
                  >
                     Cancel
                  </button>

                  <button
                     type="submit"
                     className="rating-modal-submit"
                     disabled={loading || !rating}
                  >
                     {loading
                        ? "Saving..."
                        : isModify
                           ? "Update Rating"
                           : "Submit Rating"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default RatingModal;