import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <div>
      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16 sm:py-20 md:py-24 my-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Discover & Connect with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
              {" "}
              Local Clubs
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join amazing communities around you, attend events, and grow your
            passion. ClubSphere helps you connect with clubs that match your
            interests.
          </p>

          {/* Buttons */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap">
            {/* Join a Club */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/Clubs"
                className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-4 bg-[#0092b8] text-white rounded-xl shadow-none sm:shadow-md text-xs sm:text-sm md:text-base transition"
              >
                Join a Club
              </Link>
            </motion.div>

            {/* Grab Your Seat */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/Events"
                className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-4 text-orange-600 bg-white border border-gray-300 rounded-xl shadow-none sm:shadow-md text-xs sm:text-sm md:text-base transition"
              >
                Grab Your Seat!
              </Link>
            </motion.div>
          </div>

          {/* Optional Image */}
          {/* <div className="mt-10 sm:mt-16">
            <img
              src={img}
              alt="Club Community"
              className="mx-auto w-full max-w-3xl rounded-lg shadow-lg"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Intro;
