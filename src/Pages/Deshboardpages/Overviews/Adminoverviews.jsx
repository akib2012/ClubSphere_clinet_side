import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { MdCardMembership } from "react-icons/md";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { MdPendingActions } from "react-icons/md";
import {
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import AdminChart from "./AdminChart";

/* ---------- Small Reusable Card ---------- */
const StatCard = ({ title, value, icon: Icon, iconColor }) => (
  <motion.div
    className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center ${iconColor}`}
    >
      <Icon size={22} />
    </div>
  </motion.div>
);

const Adminoverviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load summary: {error.message}
      </p>
    );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>
        <p className="text-sm text-gray-500">
          System-wide statistics and recent activity
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {[
          {
            title: "Total Users",
            value: data?.users || 0,
            icon: FaUsers,
            color: "text-[#0092b8]",
          },
          {
            title: "Total Clubs",
            value: data?.clubs?.total || 0,
            icon: FaBuilding,
            color: "text-purple-600",
          },
          {
            title: "Total Events",
            value: data?.events || 0,
            icon: FaCalendarAlt,
            color: "text-indigo-600",
          },
          {
            title: "Total Revenue",
            value: `$${data?.revenue || 0}`,
            icon: FaDollarSign,
            color: "text-orange-600",
          },
          {
            title: "Total Membership",
            value: data?.memberships || 0,
            icon: MdCardMembership,
            color: "text-orange-600",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            <StatCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconColor={item.color}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Club Status Breakdown */}
      <motion.div
        className="mt-6 bg-white p-4 rounded-2xl shadow-sm text-sm flex flex-wrap gap-4 sm:gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <span className="flex flex-1 min-w-[200px] justify-center items-center text-xl sm:text-2xl gap-2">
          <FcCheckmark size={34} /> Approved Clubs: {data?.clubs?.approved || 0}
        </span>
        <span className="flex flex-1 min-w-[200px] justify-center items-center text-xl sm:text-2xl gap-2">
          <MdPendingActions size={34} /> Pending Clubs:{" "}
          {data?.clubs?.pending || 0}
        </span>
        <span className="flex flex-1 min-w-[200px] justify-center items-center text-xl sm:text-2xl gap-2">
          <FcCancel size={34} /> Rejected Clubs: {data?.clubs?.rejected || 0}
        </span>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Membership Growth
          </h2>
          <div className="flex-1 h-64 sm:h-80 md:h-96">
            <AdminChart />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Adminoverviews;
