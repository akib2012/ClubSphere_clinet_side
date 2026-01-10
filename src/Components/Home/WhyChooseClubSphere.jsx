import { motion } from "framer-motion";
import { FaShieldAlt, FaBolt, FaUsersCog, FaCreditCard } from "react-icons/fa";

const features = [
  {
    icon: <FaUsersCog />,
    title: "Role-Based Dashboards",
    description: "Dedicated dashboards for Admins, Club Managers, and Members.",
  },
  {
    icon: <FaCreditCard />,
    title: "Secure Payments",
    description:
      "Membership and event payments powered by Stripe with full security.",
  },
  {
    icon: <FaBolt />,
    title: "Fast & Modern Experience",
    description:
      "Built with React, Tailwind, and smooth animations for great UX.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Trusted & Secure",
    description:
      "Firebase authentication and JWT-protected routes ensure safety.",
  },
];

const WhyChooseClubSphere = () => {
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
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
            ClubSphere
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-14 text-gray-600"
        >
          Everything you need to manage clubs, memberships, and events — all in
          one powerful platform.
        </motion.p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 flex justify-center text-[#0092b8]">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseClubSphere;
