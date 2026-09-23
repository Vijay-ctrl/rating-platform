import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Sidebar.css";

const Sidebar = () => {
   const { user } = useAuth();

   const role = user?.role;

   const adminLinks = [
      {
         label: "Dashboard",
         path: "/admin",
      },
      {
         label: "Users",
         path: "/admin/users",
      },
      {
         label: "Stores",
         path: "/admin/stores",
      },
   ];

   const userLinks = [
      {
         label: "Stores",
         path: "/user",
      },
   ];

   const ownerLinks = [
      {
         label: "Dashboard",
         path: "/owner",
      },
   ];

   const links =
      role === "ADMIN"
         ? adminLinks
         : role === "USER"
            ? userLinks
            : ownerLinks;

   return (
      <aside className="sidebar">
         <div className="sidebar-header">
            <span className="sidebar-title">
               Workspace
            </span>
         </div>

         <nav className="sidebar-nav">
            {links.map((link) => (
               <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/admin" || link.path === "/owner" || link.path === "/user"}
                  className={({ isActive }) =>
                     `sidebar-link ${isActive ? "sidebar-link-active" : ""
                     }`
                  }
               >
                  <span className="sidebar-link-dot" />
                  <span>{link.label}</span>
               </NavLink>
            ))}
         </nav>
      </aside>
   );
};

export default Sidebar;