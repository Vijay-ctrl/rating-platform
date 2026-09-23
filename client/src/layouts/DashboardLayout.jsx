import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./DashboardLayout.css";

const DashboardLayout = () => {
   return (
      <div className="dashboard-layout">
         <Navbar />

         <div className="dashboard-body">
            <Sidebar />

            <main className="dashboard-content">
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default DashboardLayout;