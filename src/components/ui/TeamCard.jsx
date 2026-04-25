import { motion } from "framer-motion";

const TeamCard = ({ member, index }) => {
  return (
   <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.97 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.2 }}
  className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all w-full max-w-sm p-8"
>
      <div className="relative w-20 h-20 mx-auto mb-4">
        <img
          src={member?.image}
          alt={member?.name}
          className="w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition-all duration-300"
        />
      </div>

      <h3 className="font-heading font-semibold text-foreground text-sm">
        {member?.name}
      </h3>

      <p className="text-primary text-xs font-medium">
        {member?.role}
      </p>
    </motion.div>
  );
};

export default TeamCard;