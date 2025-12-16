import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const EventDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: event,
    isLoading,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["eventdetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  const { data: registration, refetch: refetchRegistration } = useQuery({
    queryKey: ["userEventRegistration", id, user?.email],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/eventRegistrations/evnetid?evnetid=${id}&useremail=${user.email}`
      );
      return res.data;
    },
  });

  const handleRegister = async () => {
    const now = new Date();
    const bdTime = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

    const regData = {
      evnetid: id,
      useremail: user.email,
      clubId: event.clubId,
      status: "registered",
      paymentID: event?.paymentID || "free",
      regeesteredat: bdTime,
      eventWoner: event.createdBy,
      eventtitle: event.title,
      clubname: event.clubName,
      eventDate: event.eventDate,
    };

    try {
      const res = await axiosSecure.post("/eventRegistrations", regData);
      if (res.data?.success) {
        toast.success(res.data.message);
        refetchRegistration();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register");
    }
  };

  const handleCancel = async () => {
    try {
      const res = await axiosSecure.patch(
        `/eventRegistrations/cancel?evnetid=${id}&useremail=${user.email}`
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        refetchRegistration();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  if (isLoading) return <Loadingspinner />;
  if (!event)
    return <p className="text-center text-gray-500 mt-10">No event found...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Event Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left"
      >
        {event.title}
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <p className="text-gray-700 leading-7 mb-6">{event.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <b>📍 Location:</b> {event.location}
            </div>
            <div>
              <b>📅 Date:</b> {new Date(event.eventDate).toLocaleDateString()}
            </div>
            <div>
              <b>💰 Fee:</b> {event.isPaid ? `BDT ${event.eventFee}` : "Free"}
            </div>
            <div>
              <b>👤 Created By:</b> {event.createdBy}
            </div>
            <div>
              <b>⏰ Created At:</b> {new Date(event.createdAt).toLocaleString()}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Join This Event</h3>
            <p className="text-gray-600">Register now to secure your spot!</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={registration ? handleCancel : handleRegister}
            className={`mt-6 w-full py-3 rounded-xl font-semibold text-white ${
              registration
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {registration ? "Cancel Registration" : "Register Event"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
