import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiMapPin, FiTag, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Initial clubs fetch
  const { data: initialClubs = [], isLoading: loadingInitial } = useQuery({
    queryKey: ["clubs", "initial"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // Filtered + Sorted clubs
  const { data: filteredClubs = [], isFetching } = useQuery({
    queryKey: ["filterclubs", debouncedSearch, category, sortOption],
    queryFn: async () => {
      const res = await axiosSecure.get("/club/search", {
        params: {
          search: debouncedSearch,
          category,
          sort: sortOption,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const clubsToDisplay =
    filteredClubs.length > 0 ? filteredClubs : initialClubs;

  if (loadingInitial) return <Loadingspinner />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <FiTag className="text-2xl text-primary" />
        <h2 className="text-2xl font-bold">Explore Clubs</h2>
      </div>

      {/* SEARCH + FILTER + SORT */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search club name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full md:w-56"
        >
          <option value="">Select Category</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Hiking">Hiking</option>
          <option value="Music">Music</option>
          <option value="Gaming">Gaming</option>
        </select>

        {/* Sorting */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full md:w-56"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highestFee">Highest Fee</option>
          <option value="lowestFee">Lowest Fee</option>
        </select>
      </div>

      {isFetching && <Loadingspinner />}

      {/* CLUBS GRID */}
      {clubsToDisplay.length === 0 ? (
        <p className="text-center text-gray-500">No clubs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubsToDisplay.map((club) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{
                y: -8,
                boxShadow: "0px 15px 35px rgba(0,0,0,0.15)",
              }}
              className="card bg-white shadow-lg rounded-2xl overflow-hidden border"
            >
              <motion.figure
                className="h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-full object-cover"
                />
              </motion.figure>

              <div className="card-body space-y-2">
                <h2 className="card-title">{club.clubName}</h2>

                <p className="text-sm text-gray-600">
                  {club.description?.slice(0, 90)}...
                </p>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {club.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <FiDollarSign />{" "}
                    {club.membershipFee === 0
                      ? "Free"
                      : `$${club.membershipFee}`}
                  </span>
                </div>

                <span className="badge bg-orange-600 text-white w-fit">
                  {club.category}
                </span>

                <div className="card-actions justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/clubs/${club._id}`)}
                    className="btn btn-outline btn-primary btn-sm rounded-xl"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clubs;
