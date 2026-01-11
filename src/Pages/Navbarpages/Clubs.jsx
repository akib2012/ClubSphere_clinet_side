import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiMapPin, FiTag, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 8;

// 🔹 Motion Variants
const pageVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const filterVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const gridVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "clubs",
      debouncedSearch,
      category,
      sortOption,
      currentPage,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved", {
        params: {
          search: debouncedSearch,
          category,
          sort: sortOption,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loadingspinner />;

  const { clubs = [], totalPages = 1 } = data || {};

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      className="p-4 max-w-7xl mx-auto"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <FiTag className="text-2xl text-primary" />
        <h2 className="text-2xl font-bold">Explore Clubs</h2>
      </motion.div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <motion.div
          custom={0}
          variants={filterVariant}
          initial="hidden"
          animate="visible"
          className="relative flex-1"
        >
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search club name..."
            className="input input-bordered w-full pl-10"
          />
        </motion.div>

        <motion.select
          custom={1}
          variants={filterVariant}
          initial="hidden"
          animate="visible"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered md:w-52"
        >
          <option value="">All Categories</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Gaming">Gaming</option>
        </motion.select>

        <motion.select
          custom={2}
          variants={filterVariant}
          initial="hidden"
          animate="visible"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered md:w-52"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highestFee">Highest Fee</option>
          <option value="lowestFee">Lowest Fee</option>
        </motion.select>
      </div>

      {isFetching && <Loadingspinner />}

      {/* GRID */}
      {clubs.length === 0 ? (
        <p className="text-center text-gray-500">No clubs found.</p>
      ) : (
        <motion.div
          variants={gridVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {clubs.map((club) => (
            <motion.div
              key={club._id}
              variants={cardVariant}
              whileHover={{
                y: -8,
                boxShadow: "0px 15px 35px rgba(0,0,0,0.15)",
              }}
              className="card bg-white shadow-lg rounded-2xl border"
            >
              <motion.figure
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-44 overflow-hidden"
              >
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-full object-cover"
                />
              </motion.figure>

              <div className="card-body space-y-2">
                <h3 className="font-bold">{club.clubName}</h3>

                <p className="text-sm text-gray-600">
                  {club.description?.slice(0, 80)}...
                </p>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {club.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiDollarSign />
                    {club.membershipFee === 0
                      ? "Free"
                      : `$${club.membershipFee}`}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/clubs/${club._id}`)}
                  className="btn btn-outline btn-primary btn-sm rounded-xl"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-2 mt-10"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn btn-sm"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn btn-sm"
          >
            Next
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Clubs;
