import { motion } from "framer-motion";
import bgimg from '../../assets/about.png'

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50">
      {/* ================= HERO ================= */}
      <section className="relative py-24 px-4 text-white overflow-hidden rounded-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgimg})`,
            opacity: 0.25,
            zIndex: 2,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0092b8] to-orange-600 opacity-90" />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-100"
          >
            Your privacy matters to us. This policy explains how ClubSphere
            collects, uses, and protects your information.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect basic personal information such as your name, email
              address, and account details when you register or use ClubSphere.
              This information helps us deliver a secure and personalized
              experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Data
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is used to manage club memberships, process secure
              payments, communicate updates, and improve platform performance.
              We never sell your personal information to third parties.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ClubSphere uses industry-standard security practices including
              authentication, encrypted payments, and secure servers to protect
              your data from unauthorized access.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies & Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may use cookies to enhance user experience, analyze traffic,
              and understand platform usage. You can manage cookie preferences
              through your browser settings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This privacy policy may be updated occasionally. Any changes will
              be reflected on this page, and continued use of ClubSphere implies
              acceptance of the updated policy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
