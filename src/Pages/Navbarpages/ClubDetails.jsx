import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loadingspinner from "../../Components/Shared/Loadingspinner";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner />;
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/*  Banner */}
      <motion.div
        className="relative h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white p-6">
            {club.clubName}
          </h2>
        </div>
      </motion.div>

      {/*  Info + Join Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/*  Club Info */}
        <motion.div
          className="lg:col-span-2 bg-base-100 rounded-2xl shadow-md p-6 md:p-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {club.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">📍 Location:</span>
              <span>{club.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">📂 Category:</span>
              <span className="badge badge-outline">{club.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">💳 Membership Fee:</span>
              <span className="text-primary font-bold">
                {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
              </span>
            </div>
          </div>
        </motion.div>

        {/*  Join Section */}
        <motion.div
          className="bg-base-100 rounded-2xl shadow-md p-6 h-fit sticky top-24"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-2">Join This Club</h3>
          <p className="text-sm text-gray-500 mb-4">
            Become a member and join exclusive events & activities.
          </p>

          <Link to={`/clubs/${club._id}/membership`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-orange-600 text-white w-full"
            >
              Join Membership
            </motion.button>
          </Link>

          {club?.alreadyMember && (
            <p className="text-success text-sm mt-3 font-medium">
               You are already a member
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClubDetails;
