import React from 'react';
import { FaUserEdit, FaEnvelope, FaUserTag } from 'react-icons/fa';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loadingspinner from '../../../Components/Shared/Loadingspinner';

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: profileinfo, isLoading, error } = useQuery({
    queryKey: ['profileinfo'],
    queryFn: async () => {
      const res = await axiosSecure.get('/userprofile');
      return res.data;
    }
  });

  console.log(profileinfo)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  // Helper function to get role badge style
  const getRoleStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/90 text-white';
      case 'manager':
        return 'bg-[#0092b8] text-white';
      case 'member':
      default:
        return 'bg-gray-500/90 text-white';
    }
  };

  if (isLoading) return <Loadingspinner></Loadingspinner>;
  if (error) return <div className="text-center mt-20 text-red-500">Failed to load profile</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-orange-300 pb-2 flex items-center">
          <FaUserTag className="mr-3 text-[#0092b8]" />
          My Profile Overview
        </h2>

        {/* Profile Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 border-t-4 border-[#0092b8] overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Left Section: Photo and Upload */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <img
                src={profileinfo?.photo || '/default-avatar.png'}
                alt={`${profileinfo?.name || 'User'}'s profile`}
                className="w-full h-full object-cover rounded-full border-4 border-orange-300 shadow-lg"
              />
              <button 
                className="absolute bottom-0 right-0 bg-[#0092b8] text-white p-2 rounded-full shadow-lg hover:bg-[#007a9e] transition duration-300"
                title="Change Photo"
              >
                <MdOutlinePhotoCamera className="w-5 h-5" />
              </button>
            </div>

            {/* Right Section: Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-extrabold text-gray-900 mb-1 leading-tight">
                {profileinfo?.name || 'No Name'}
              </h3>
              
              {/* Role Badge */}
              {profileinfo?.role && (
                <span 
                  className={`inline-block text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wider mb-4 ${getRoleStyle(profileinfo.role)}`}
                >
                  {profileinfo.role}
                </span>
              )}

              {/* Contact Info */}
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center justify-center md:justify-start text-lg">
                  <FaEnvelope className="text-orange-600 mr-3 w-5 h-5" />
                  {profileinfo?.email || 'No Email'}
                </p>
                <p className="flex items-center justify-center md:justify-start text-lg">
                  <FaUserTag className="text-orange-600 mr-3 w-5 h-5" />
                  Account Role: <span className="font-semibold ml-1 capitalize">{profileinfo?.role || 'member'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Optional Edit Button */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <motion.button
              className="btn btn-lg bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <FaUserEdit className="w-5 h-5" />
              Edit Profile Info
            </motion.button>
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
