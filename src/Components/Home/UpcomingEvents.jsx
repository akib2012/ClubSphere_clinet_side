import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router";

// Example events (static)
const events = [
  {
    title: "Photography Masterclass",
    date: "Jan 20, 2026",
    location: "City Hall",
    isPaid: true,
  },
  {
    title: "Tech Meetup 2026",
    date: "Feb 5, 2026",
    location: "Tech Park",
    isPaid: false,
  },
  {
    title: "Yoga & Wellness",
    date: "Feb 12, 2026",
    location: "Community Center",
    isPaid: true,
  },
  {
    title: "Book Club Discussion",
    date: "Mar 2, 2026",
    location: "Library Hall",
    isPaid: false,
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 my-10">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">Events</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-14 text-gray-600"
        >
          Don’t miss out! Register now and be part of exciting community events.
        </motion.p>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <FaCalendarAlt className="mr-2 text-[#0092b8]" /> {event.date}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <FaMapMarkerAlt className="mr-2 text-[#0092b8]" /> {event.location}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${event.isPaid ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}>
                  {event.isPaid ? "Paid" : "Free"}
                </span>
                <button className="flex items-center text-[#0092b8] font-semibold text-sm hover:underline">
                  Register <FaTicketAlt className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <Link to={"/Events"}>
          <button className="btn bg-[#0092b8] hover:bg-[#007a99] text-white rounded-2xl px-8">
            View All Events 
          </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default UpcomingEvents;
