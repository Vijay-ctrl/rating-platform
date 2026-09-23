import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
   const navigate = useNavigate();
   const { user, logout } = useAuth();

   const handleLogout = () => {
      logout();
      navigate("/login");
   };

   return (
      <header className="navbar">
         <div className="navbar-brand">
            <span className="navbar-logo">RP</span>

            <div>
               <h1>Rating Platform</h1>
               <p>{user?.role?.replace("_", " ")}</p>
            </div>
         </div>

         <div className="navbar-user">
            <div className="navbar-user-info">
               <span className="navbar-user-name">
                  {user?.name}
               </span>

               <span className="navbar-user-email">
                  {user?.email}
               </span>
            </div>

            <button
               type="button"
               className="navbar-logout"
               onClick={handleLogout}
            >
               Logout
            </button>
         </div>
      </header>
   );
};

export default Navbar;