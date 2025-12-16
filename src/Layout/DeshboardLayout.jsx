import React from "react";
import { Link, Outlet, useLocation } from "react-router"; 
import useRole from "../router/useRole";

// icons
import { IoIosCreate } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import {
  MdManageHistory,
  MdCreateNewFolder,
  MdGroups2,
  MdMapsHomeWork,
  MdAttachMoney,
} from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
import { FaRegIdBadge } from "react-icons/fa6";

const DashboardLayout = () => {
  const { role } = useRole();
  const location = useLocation();

  
  const isActive = (path) => location.pathname === path;

  // Custom menu item component to apply consistent and active styling
  const MenuItem = ({ to, icon: Icon, children }) => {
    const active = isActive(to);
    return (
      <li>
        <Link
          to={to}
          className={`
            flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200
            ${
              active
                ? "bg-[#0092b8] text-white shadow-md hover:bg-[#007a9e]" 
                : "text-gray-700 hover:bg-gray-100 hover:text-[#0092b8]"
            }
          `}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="truncate">{children}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-[#0092b8] text-white shadow-lg px-6 py-3 sticky top-0 z-10">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold tracking-wide ml-2">
              Club<span className="text-orange-300">Sphere</span>
            </h1>
          </div>
          {/* Add potential navbar right elements here, e.g., notifications or user menu */}
        </nav>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-xl">
          {/* Dashboard Header/Logo for mobile view (hidden in original, added for completeness) */}
          <div className="p-6 bg-[#0092b8] lg:hidden">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              Club<span className="text-orange-300">Sphere</span>
            </h1>
          </div>

          {/* Profile Button */}
          <div className="p-4 border-b border-gray-200">
            <Link
              to="/deshboard/profile"
              className="btn w-full bg-orange-600 hover:bg-orange-700 text-white flex gap-2 items-center justify-center py-2 transition duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              <FaUser className="w-5 h-5" />
              View Profile
            </Link>
          </div>

          {/* Menu */}
          <ul className="menu p-4 flex flex-col gap-2 text-base-content overflow-y-auto">
            {/* Common Links */}
            <MenuItem to="/" icon={MdMapsHomeWork}>
              Homepage
            </MenuItem>

            {/* Manager Links */}
            {role === "manager" && (
              <>
                <div className="divider text-xs uppercase text-gray-500 my-2">
                  Manager Tools
                </div>
                <MenuItem to="/deshboard" icon={MdMapsHomeWork}>
                  Admin Overview
                </MenuItem>
                <MenuItem
                  to="/deshboard/manager/create-club"
                  icon={IoIosCreate}
                >
                  Create Club
                </MenuItem>
                <MenuItem
                  to="/deshboard/manager/create-event"
                  icon={MdCreateNewFolder}
                >
                  Create Event
                </MenuItem>
                <MenuItem
                  to="/deshboard/manager/my-clubs"
                  icon={BsCollectionFill}
                >
                  My Clubs
                </MenuItem>
                <MenuItem
                  to="/deshboard/manager/ClubMembersPanel"
                  icon={MdGroups2}
                >
                  Club Members
                </MenuItem>
                <MenuItem
                  to="/deshboard/manager/event-mangemnet"
                  icon={FiCalendar}
                >
                  Event Management
                </MenuItem>
                <MenuItem
                  to="/deshboard/manager/event-registrations"
                  icon={FaRegIdBadge}
                >
                  Event Registrations
                </MenuItem>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <div className="divider text-xs uppercase text-gray-500 my-2">
                  Admin Tools
                </div>
                <MenuItem to="/deshboard" icon={MdMapsHomeWork}>
                  Admin Overview
                </MenuItem>
                <MenuItem to="/deshboard/admin/manageuser" icon={FaUser}>
                  Manage Users
                </MenuItem>
                <MenuItem
                  to="/deshboard/admin/manageclub"
                  icon={MdManageHistory}
                >
                  Manage Clubs
                </MenuItem>
                <MenuItem
                  to="/deshboard/admin/Transactions"
                  icon={MdAttachMoney}
                >
                  Transactions
                </MenuItem>
              </>
            )}

            {/* Member Links */}
            {role === "member" && (
              <>
                <div className="divider text-xs uppercase text-gray-500 my-2">
                  Member Panel
                </div>
                <MenuItem to="/deshboard" icon={MdMapsHomeWork}>
                  Dashboard
                </MenuItem>
                <MenuItem
                  to="/deshboard/member/my-club"
                  icon={BsCollectionFill}
                >
                  My Clubs
                </MenuItem>
                <MenuItem to="/deshboard/member/my-events" icon={FiCalendar}>
                  My Events
                </MenuItem>
                <MenuItem
                  to="/deshboard/member/transaction"
                  icon={MdAttachMoney}
                >
                  Transaction History
                </MenuItem>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
