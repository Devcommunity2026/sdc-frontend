import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const MentorCard = ({ mentor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="group gradient-card rounded-2xl p-6 border border-border card-hover text-center"
  >
    <div className="relative w-24 h-24 mx-auto mb-4">
      <img
        src={mentor.image}
        alt={mentor.name}
        className="w-full h-full rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-all duration-300"
      />

      <div className="absolute -bottom-1 -right-1 w-8 h-8 gradient-cyan rounded-full flex items-center justify-center">
        <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={14} className="text-primary-foreground" />
        </a>
      </div>
    </div>

    <h3 className="font-heading font-semibold text-foreground">
      {mentor.name}
    </h3>

    <p className="text-primary text-xs font-medium mb-2">
      {mentor.role}
    </p>

    <p className="text-sm text-muted-foreground leading-relaxed">
      {mentor.bio}
    </p>
  </motion.div>
);

export default MentorCard;