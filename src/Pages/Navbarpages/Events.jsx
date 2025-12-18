import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

 
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchText);
    }, 400); // debounce time

    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", searchQuery],
    queryFn: async () => {
      if (searchQuery.trim()) {
        const res = await axiosSecure.get("/event/search", {
          params: { search: searchQuery.trim() },
        });
        return res.data;
      } else {
        const res = await axiosSecure.get("/Events");
        return res.data;
      }
    },
  });

  const handleSearch = () => {
    setSearchQuery(searchText);
  };

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="px-4 md:px-8 lg:px-16 mb-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Explore Events</h2>
        <p className="text-gray-500 mt-1">
          Discover upcoming events and reserve your seat
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered flex-1 w-full"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="btn bg-orange-600 hover:bg-orange-700 text-white w-full md:w-auto rounded-xl"
        >
          Search
        </motion.button>
      </div>

      {/* NO DATA */}
      {events.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No events found.
        </p>
      ) : (
        /* EVENTS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{
                y: -8,
                boxShadow: "0px 15px 35px rgba(255,165,0,0.25)",
              }}
              className="card bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="card-body space-y-4 p-5">
                <h2 className="card-title text-lg md:text-xl font-bold">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-600">
                  {event.description?.slice(0, 120)}...
                </p>

                <div className="flex justify-between text-sm font-medium flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-gray-700">
                    <FiMapPin className="text-orange-500" />
                    {event.location}
                  </span>

                  <span className="flex items-center gap-1 text-gray-700">
                    <FiDollarSign className="text-orange-500" />
                    {event.isPaid ? `$${event.eventFee}` : "Free"}
                  </span>
                </div>

                <div className="flex justify-between text-xs md:text-sm text-gray-500 flex-wrap gap-2">
                  <span>
                    <strong>Date:</strong>{" "}
                    {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>By:</strong> {event.createdBy}
                  </span>
                </div>

                <div className="card-actions justify-end mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="btn bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl w-full"
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

export default Events;
