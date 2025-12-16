import React, { useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ["events", searchText],
    queryFn: async () => {
      if (searchText.trim()) {
        const res = await axiosSecure.get("/event/search", {
          params: { search: searchText.trim() },
        });
        return res.data;
      } else {
        const res = await axiosSecure.get("/Events");
        return res.data;
      }
    },
  });

  const handleSearch = () => {
    refetch();
  };

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="px-4 md:px-8 lg:px-16 mb-5">
        <h2 className="text-2xl font-bold">Explore Events</h2>
      {/* Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered flex-1 w-full md:w-auto"
        />
        <button
          onClick={handleSearch}
          className="btn bg-orange-600 hover:bg-orange-700 text-white w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="card border border-gray-200 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-orange-300 transition-shadow duration-300"
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

              <div className="flex justify-between text-sm text-gray-500 mt-2 flex-wrap gap-2">
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </span>
                <span>
                  <strong className="pl-2.5">By:</strong> {event.createdBy}
                </span>
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => navigate(`/events/${event._id}`)}
                  className="btn bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
