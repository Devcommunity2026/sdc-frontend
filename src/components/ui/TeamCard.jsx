import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const roleColors = {
  "Frontend Developer": { bg: "#e0f2fe", text: "#0369a1", dot: "#38bdf8" },
  "Backend Developer":  { bg: "#ede9fe", text: "#6d28d9", dot: "#a78bfa" },
  "UI/UX Designer":     { bg: "#fce7f3", text: "#be185d", dot: "#f472b6" },
  "Full Stack Developer":{ bg: "#dcfce7", text: "#15803d", dot: "#4ade80" },
};

const defaultColor = { bg: "#f1f5f9", text: "#475569", dot: "#94a3b8" };

const TeamCard = ({ member, index }) => {
  const color = roleColors[member?.role] || defaultColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ position: "relative" }}
      className="group"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{ background: color.bg, transform: "scale(0.85)" }}
      />

      {/* Card */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group-hover:shadow-xl transition-shadow duration-500">

        {/* Top color bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${color.dot}, ${color.text})` }}
        />

        {/* Content */}
        <div className="px-6 pt-6 pb-5 flex flex-col items-center text-center">

          {/* Avatar with ring */}
          <div className="relative mb-4">
            <div
              className="w-20 h-20 rounded-full p-0.5"
              style={{ background: `linear-gradient(135deg, ${color.dot}, ${color.text})` }}
            >
              <img
                src={member?.image}
                alt={member?.name}
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-900"
              />
            </div>
            {/* Online dot */}
            <span
              className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900"
              style={{ background: color.dot }}
            />
          </div>

          {/* Name */}
          <h3 className="font-bold text-gray-900 dark:text-white text-base tracking-tight mb-1">
            {member?.name}
          </h3>

          {/* Role badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-5"
            style={{ background: color.bg, color: color.text }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color.dot }} />
            {member?.role}
          </span>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-4" />

          {/* LinkedIn button */}
          <motion.a
            href={member?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300"
            style={{
              borderColor: color.dot,
              color: color.text,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = color.text;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = color.text;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = color.text;
              e.currentTarget.style.borderColor = color.dot;
            }}
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