import { motion } from "framer-motion";
import {
  FaUsers,
  FaBullseye,
  FaHandshake,
  FaRocket,
  FaPeopleCarry,
  FaChartLine,
  FaLock,
  FaMagic,
} from "react-icons/fa";
import aboutimg from "../../assets/about.png";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="bg-gray-50 my-10">

      {/* ================= HERO ================= */}
      <section className="relative py-28 px-4 text-white overflow-hidden rounded-2xl">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${aboutimg})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0092b8] to-orange-600 opacity-60 z-10" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About ClubSphere
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-100 font-bold"
          >
            ClubSphere helps local clubs and communities grow, connect, and
            manage everything seamlessly in one modern platform.
          </motion.p>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600 ml-2">
                Mission
              </span>
            </h2>

            <p className="text-gray-600">
              Our mission is to empower communities with digital tools that
              simplify club management, encourage participation, and strengthen
              real human connections.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <FaUsers className="text-3xl text-[#0092b8] mb-3" />
              <h4 className="font-semibold text-gray-900">Community First</h4>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <FaHandshake className="text-3xl text-[#0092b8] mb-3" />
              <h4 className="font-semibold text-gray-900">Trusted Platform</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BUILT FOR COMMUNITIES ================= */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Built for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600 ml-2">
                Real Communities
              </span>
            </h2>

            <p className="max-w-3xl mx-auto mt-4 text-gray-600">
              Designed around how people actually connect, collaborate, and grow
              together.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaPeopleCarry />,
                title: "Stronger Connections",
                desc: "Bring people together through shared interests and events.",
              },
              {
                icon: <FaChartLine />,
                title: "Sustainable Growth",
                desc: "Tools that help clubs scale without added complexity.",
              },
              {
                icon: <FaLock />,
                title: "Trust & Security",
                desc: "Secure authentication and payments you can rely on.",
              },
              {
                icon: <FaMagic />,
                title: "Effortless Experience",
                desc: "Clean UI and smooth workflows for everyone.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl text-[#0092b8] mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-14"
          >
            What We
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600 ml-2">
              Offer
            </span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaUsers />, title: "Club Management" },
              { icon: <FaRocket />, title: "Event Hosting" },
              { icon: <FaBullseye />, title: "Member Engagement" },
              { icon: <FaHandshake />, title: "Secure Payments" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl text-[#0092b8] mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0092b8] to-orange-600 text-white text-center rounded-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Build Your Community?
        </motion.h2>

       <Link to={'/Clubs'}>
        <button className="bg-white text-[#0092b8] font-semibold px-8 py-3 rounded-2xl hover:scale-105 transition">
          Get Started
        </button>
       </Link>
      </section>

    </div>
  );
};

export default About;
