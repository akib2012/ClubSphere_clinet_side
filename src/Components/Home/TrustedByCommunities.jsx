import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarCheck,
  FaBuilding,
  FaCreditCard,
} from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router";

const stats = [
  { icon: <FaBuilding />, value: "120+", label: "Active Clubs" },
  { icon: <FaUsers />, value: "3,500+", label: "Community Members" },
  { icon: <FaCalendarCheck />, value: "420+", label: "Events Hosted" },
  { icon: <FaCreditCard />, value: "1,000+", label: "Secure Payments" },
];

const TrustedByCommunities = () => {

    const {user} = useAuth();
  return (
    <section className="py-20 px-4 bg-gray-50 rounded-2xl my-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
        >
          Trusted by Growing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
            Communities
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-14 text-gray-600"
        >
          Thousands of members and club managers rely on ClubSphere to build,
          manage, and grow meaningful communities.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                rounded-2xl p-6
                bg-white
                shadow-md hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              <div className="text-4xl mb-4 flex justify-center text-[#0092b8] shrink-0">
                {stat.icon}
              </div>

              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>

              <p className="text-sm mt-1 text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14"
        >
         {/*  <Link to={`user ? ''`}>
          <button className="btn bg-[#0092b8] hover:bg-[#007a99] text-white rounded-2xl px-8">
            Join the Community
          </button>
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedByCommunities;
