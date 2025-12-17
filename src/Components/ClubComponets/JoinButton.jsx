import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const JoinButton = ({ club, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleJoin = async () => {
    const membershipInfo = {
      userEmail: user.email,
      clubname: club.clubName,
      location: club.location,
      clubId: club._id,
      status: club.membershipFee === 0 ? "active" : "pendingPayment",
      joinedAt: new Date().toISOString().split("T")[0],
      manageremail: club.managerEmail,
    };

    try {
      const res = await axiosSecure.post("/memberships", membershipInfo);

      if (res.data.membershipId) {
        toast.success(
          club.membershipFee === 0
            ? "Membership activated 🎉"
            : "Join request submitted. Please complete payment 💳"
        );
        refetch();
      }
    } catch (err) {
      toast.error("Failed to join");
    }
  };

  return (
    <motion.button
      onClick={handleJoin}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="btn bg-orange-600 hover:bg-orange-700 text-white w-full"
    >
      Join Membership
    </motion.button>
  );
};

export default JoinButton;
