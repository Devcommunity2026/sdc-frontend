import { motion } from "framer-motion";
import { Globe, Brain, Shield } from "lucide-react";
import { lightTheme, darkTheme } from "./theme";

const DomainCard = ({ title, description, icon, isDark = false }) => {
  const theme = isDark ? darkTheme : lightTheme;

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
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        boxShadow: `0px 15px 30px ${theme.shadow}`,
      }}
      style={{
        background: theme.gradientBg,
        border: `1px solid ${theme.border}`,
        padding: "24px",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15px",
          background: theme.iconBg,
          color: theme.iconColor,
        }}
      >
        <Icon size={26} />
      </div>

      <h3 style={{ marginBottom: "8px", fontSize: "18px", color: theme.text }}>
        {title}
      </h3>

      <p
        style={{
          color: theme.text,
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default DomainCard;