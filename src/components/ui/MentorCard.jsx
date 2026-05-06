import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const MentorCard = ({ mentor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="
      group rounded-2xl p-6 text-center border transition-all
      bg-card text-card-foreground border-border
      hover:shadow-lg
      dark:bg-dark-card dark:text-dark-card-foreground dark:border-dark-border
    "
  >
    {/* Avatar */}
    <div className="relative w-24 h-24 mx-auto mb-4">
      <img
        src={mentor.image}
        alt={mentor.name}
        className="
          w-full h-full rounded-full object-cover border-2 transition-all duration-300
          border-primary/30 group-hover:border-primary
          dark:border-dark-primary/30 dark:group-hover:border-dark-primary
        "
      />

      {/* LinkedIn icon */}
      <div
        className="
          absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center
          bg-primary text-primary-foreground
          dark:bg-dark-primary dark:text-dark-primary-foreground
        "
      >
        <a
          href={mentor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={14} />
        </a>
      </div>
    </div>

    {/* Name */}
    <h3 className="font-heading font-semibold text-foreground dark:text-dark-foreground">
      {mentor.name}
    </h3>

    {/* Role */}
    <p className="text-xs font-medium mb-2 text-primary dark:text-dark-primary">
      {mentor.role}
    </p>

    {/* Bio */}
    <p className="text-sm leading-relaxed text-muted-foreground dark:text-dark-muted-foreground">
      {mentor.bio}
    </p>
  </motion.div>
);

export default MentorCard;