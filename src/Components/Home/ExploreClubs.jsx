import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

// Example club cards (static)
const clubs = [
  {
    name: "Photography Club",
    category: "Arts & Culture",
    members: 120,
  },
  {
    name: "Tech Innovators",
    category: "Technology",
    members: 250,
  },
  {
    name: "Fitness Freaks",
    category: "Health & Sports",
    members: 180,
  },
  {
    name: "Book Lovers",
    category: "Literature",
    members: 95,
  },
];

const ExploreClubs = () => {
  return (
    <section className="py-20 px-4 bg-white my-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Explore{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
            Clubs
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-14 text-gray-600"
        >
          Find a club that matches your interests and join the community today.
        </motion.p>

        {/* Club Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gray-50 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {club.name}
                </h3>
                <p className="text-gray-500 text-sm">{club.category}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-gray-700 text-sm">
                <span>{club.members} Members</span>
                <FaArrowRight className="text-[#0092b8]" />
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
          <Link to={"/Clubs"}>
          <button className="btn bg-[#0092b8] hover:bg-[#007a99] text-white rounded-2xl px-8">
            View All Clubs 
          </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreClubs;
