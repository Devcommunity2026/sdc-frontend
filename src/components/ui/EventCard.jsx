import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
const EventCard = ({ event, index }) => (
  <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.97 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.2 }}
  className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all"
>
    <div className="relative h-48 overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
    </div>

    <div className="p-6">
      <div className="flex items-center gap-2 text-primary text-xs font-medium mb-2">
        <Calendar size={14} />
        {new Date(event.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {event.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {event.description}
      </p>
    </div>
  </motion.div>
);

export default EventCard;