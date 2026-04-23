import { motion } from "framer-motion";
import { Globe, Brain, Shield } from "lucide-react";

const DomainCard = ({ title, description, icon }) => {
  const icons = {
    web: Globe,
    ai: Brain,
    security: Shield,
  };

  const Icon = icons[icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -10,
        boxShadow: "0px 15px 30px var(--color-shadow)",
      }}
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        padding: "24px",
        borderRadius: "16px",
        cursor: "pointer",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15px",
          background: "var(--color-icon-bg)",
          color: "var(--color-icon)",
        }}
      >
        <Icon size={26} />
      </div>

      {/* Title */}
      <h3
        style={{
          marginBottom: "8px",
          fontSize: "18px",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.5",
          color: "var(--color-text)",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default DomainCard;