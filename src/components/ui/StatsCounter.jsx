import { motion } from "framer-motion";

const StatCounter = ({ stat, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="
      rounded-2xl p-6 text-center border transition-all
      bg-card text-card-foreground border-border
      hover:shadow-lg
      dark:bg-dark-card dark:text-dark-card-foreground dark:border-dark-border
    "
    >
        {/* Value */}
        <div
            className="
        text-3xl md:text-4xl font-heading font-bold
        text-primary
        dark:text-dark-primary
      "
        >
            {stat.value}
            {stat.suffix}
        </div>

        {/* Label */}
        <div
            className="
        text-sm mt-1 font-medium
        text-muted-foreground
        dark:text-dark-muted-foreground
      "
        >
            {stat.label}
        </div>
    </motion.div>
);

export default StatCounter;