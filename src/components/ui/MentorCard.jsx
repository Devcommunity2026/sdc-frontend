import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";

const MentorCard = ({ mentor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="
        relative overflow-hidden rounded-3xl
        border shadow-md transition-all duration-300
        bg-card text-card-foreground border-border
        hover:shadow-xl
        dark:bg-dark-card dark:text-dark-card-foreground dark:border-dark-border
      "
    >
      {/* Card Content */}
      <div className="px-6 pt-10 pb-8 text-center">

        {/* Profile Image */}
        <div className="relative w-fit mx-auto mb-5">
          <img
            src={mentor.profileImage}
            alt={mentor.name}
            className="
              w-28 h-28 rounded-full object-cover
              border-[3px]
              border-primary
              shadow-lg
            "
          />

          {/* LinkedIn Button */}
          <a
            href={mentor.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="
              absolute bottom-0 right-0
              w-10 h-10 rounded-full
              flex items-center justify-center
              bg-primary text-white
              shadow-md
              hover:scale-110 transition-all
            "
          >
            <FaLinkedinIn size={16} />
          </a>
        </div>

        {/* Name */}
        <h2
          className="
            text-2xl font-bold mb-1
            text-foreground dark:text-dark-foreground
          "
        >
          {mentor.name}
        </h2>

        {/* Position */}
        <p
          className="
            text-primary dark:text-dark-primary
            font-medium text-lg mb-5
          "
        >
          {mentor.Position}
        </p>

        {/* Role Description */}
        <p
          className="
            text-base leading-relaxed
            text-muted-foreground
            dark:text-dark-muted-foreground
          "
        >
          {mentor.roleDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default MentorCard;