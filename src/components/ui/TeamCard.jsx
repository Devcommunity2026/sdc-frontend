import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all w-full max-w-sm p-8 text-center"
    >
      
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto mb-4">
        <img
          src={member?.image}
          alt={member?.name}
          className="w-full h-full rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-500 transition-all duration-300"
        />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
        {member?.name}
      </h3>

      {/* Role */}
      <p className="text-blue-500 text-xs font-medium mt-1">
        {member?.role}
      </p>

      {/* LinkedIn Icon */}
      <a
    href={member?.linkedin}
     target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white transition-all"
    >
  <FaLinkedin className="w-6 h-6 text-blue-600 group-hover:text-white" />
</a>

    </motion.div>
  );
};

export default TeamCard;