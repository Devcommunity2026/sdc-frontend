import { motion } from "framer-motion";
import { Globe, Brain, Shield, Smartphone, GitBranch } from "lucide-react";

const iconMap = { Globe, Brain, Shield, Smartphone, GitBranch };

const DomainCard = ({ domain, index }) => {
  
  const Icon = iconMap[domain.icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200
       dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-default"
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${domain.color === "purple"
            ? "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
            : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
          }`}
      >
        <Icon size={26} />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {domain.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {domain.description}
      </p>
    </motion.div>
  );
};

export default DomainCard;