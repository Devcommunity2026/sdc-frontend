import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      {/* Outer glow */}
      <div
        className="
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 blur-xl -z-10 scale-90
          bg-accent dark:bg-dark-accent
        "
      />

      {/* Card */}
      <div
        className="
          relative rounded-3xl overflow-hidden border shadow-sm 
          group-hover:shadow-xl transition-shadow duration-500
          bg-card text-card-foreground border-border
          dark:bg-dark-card dark:text-dark-card-foreground dark:border-dark-border
        "
      >
        {/* Top bar */}
        <div className="h-1.5 w-full bg-primary dark:bg-dark-primary" />

        {/* Content */}
        <div className="px-6 pt-6 pb-5 flex flex-col items-center text-center">

          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full p-[2px] bg-primary dark:bg-dark-primary">
              <img
                src={member?.image}
                alt={member?.name}
                className="
                  w-full h-full rounded-full object-cover
                  border-2 border-background dark:border-dark-background
                "
              />
            </div>

            {/* Online dot */}
            <span
              className="
                absolute bottom-1 right-1 w-3 h-3 rounded-full border-2
                bg-accent border-background
                dark:bg-dark-accent dark:border-dark-background
              "
            />
          </div>

          {/* Name */}
          <h3 className="font-bold text-base tracking-tight mb-1 text-foreground dark:text-dark-foreground">
            {member?.name}
          </h3>

          {/* Role badge */}
          <span
            className="
              inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5
              bg-secondary text-secondary-foreground
              dark:bg-dark-secondary dark:text-dark-secondary-foreground
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-dark-primary" />
            {member?.role}
          </span>

          {/* Divider */}
          <div className="w-full h-px mb-4 bg-border dark:bg-dark-border" />

          {/* LinkedIn button */}
          <motion.a
            href={member?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border
              transition-all duration-300
              border-primary text-primary
              hover:bg-primary hover:text-primary-foreground
              dark:border-dark-primary dark:text-dark-primary
              dark:hover:bg-dark-primary dark:hover:text-dark-primary-foreground
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin className="w-3.5 h-3.5" />
            Connect
          </motion.a>

        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;