import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiMapPin, FiTag, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  //approved
  const { data: initialClubs = [], isLoading: loadingInitial } = useQuery({
    queryKey: ["clubs", "initial"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // Search + Filter
  const { data: filteredClubs = [], isFetching } = useQuery({
    queryKey: ["filterclubs", debouncedSearch, category],
    queryFn: async () => {
      if (!debouncedSearch && !category) return initialClubs;
      const res = await axiosSecure.get("/club/search", {
        params: { search: debouncedSearch, category },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const clubsToDisplay = filteredClubs.length ? filteredClubs : initialClubs;

  if (loadingInitial) return <Loadingspinner />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FiTag className="text-2xl text-primary" />
        <h2 className="text-2xl font-bold">Explore Clubs</h2>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
      </div>

      {isFetching && <p className="text-sm text-gray-400 mb-3">Loading clubs...</p>}

      {/* Clubs Grid */}
      {clubsToDisplay.length === 0 ? (
        <p className="text-center text-gray-500">No clubs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubsToDisplay.map((club) => (
            <div
              key={club._id}
              className="card bg-white shadow-lg rounded-2xl overflow-hidden border"
            >
              <figure className="h-48">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body space-y-2">
                <h2 className="card-title">{club.clubName}</h2>
                <p className="text-sm text-gray-600">{club.description?.slice(0, 90)}...</p>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {club.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <FiDollarSign /> {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                  </span>
                </div>

                <span className="badge bg-orange-600 text-white w-fit">{club.category}</span>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => navigate(`/clubs/${club._id}`)}
                    className="btn btn-outline btn-primary btn-sm rounded-xl"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clubs;
