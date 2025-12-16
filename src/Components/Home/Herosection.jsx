import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../Shared/Loadingspinner";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const HeroSection = () => {
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["approvedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-clubs");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="mt-5">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
      >
        {clubs.map((club) => (
          <div key={club._id} className="relative">
            <img
              src={club.bannerImage}
              className="h-[300px] sm:h-[380px] lg:h-[480px] w-full object-cover rounded-2xl"
              alt={club.clubName}
            />

            <div
              className="
                absolute
                bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-32
                left-1/2 -translate-x-1/2
                text-center
                bg-white/80 backdrop-blur-md
                rounded-2xl
                p-3 sm:p-5 md:p-6
                w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]
                mx-auto
                space-y-2 sm:space-y-4
              "
            >
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                {club.clubName}
                <br />
                <span className="text-indigo-600 block mt-1 text-sm sm:text-base md:text-lg">
                  <Typewriter
                    words={[
                      "Find Active Clubs",
                      "Become a Member",
                      "Participate in Events",
                    ]}
                    loop
                    cursor
                  />
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-gray-700 mx-auto">
                {club.description?.slice(0, 120)}...
              </p>

              <Link to={`/clubs/${club._id}`}>
                <button
                  className="
                    btn
                    bg-cyan-600 hover:bg-cyan-700
                    text-white
                    rounded-2xl
                    px-4 sm:px-6
                    py-2 sm:py-3
                    text-xs sm:text-sm md:text-base
                    w-full
                  "
                >
                  Explore Club
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
