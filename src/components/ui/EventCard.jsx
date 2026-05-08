import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ExternalLink } from "lucide-react";

const EventCard = ({ event, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Event Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setOpen(true)}
        className="
          cursor-pointer
          group rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all
          bg-card text-card-foreground border-border
          dark:bg-dark-card dark:text-dark-card-foreground dark:border-dark-border
        "
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.thumbnail || event.image}
            alt={event.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <div className="flex items-center gap-2 text-primary dark:text-dark-primary text-xs font-medium mb-2">
            <Calendar size={14} />

            {new Date(event.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-dark-foreground">
            {event.title}
          </h3>

          {/* Description */}
          <p
            className="
              text-sm leading-relaxed line-clamp-2
              text-muted-foreground dark:text-dark-muted-foreground
            "
          >
            {event.description}
          </p>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="
              fixed inset-0 z-50
              bg-black/60 backdrop-blur-sm
              flex items-center justify-center p-4
            "
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative w-full max-w-2xl overflow-hidden rounded-2xl
                bg-card dark:bg-dark-card
                border border-border dark:border-dark-border
                shadow-2xl
              "
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute top-4 right-4 z-10
                  p-2 rounded-full
                  bg-black/40 text-white
                  hover:bg-black/60 transition
                "
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="h-72 w-full overflow-hidden">
                <img
                  src={event.thumbnail || event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                  <Calendar size={16} />

                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-dark-foreground">
                  {event.title}
                </h2>

                {/* Full Description */}
                <p
                  className="
                    leading-relaxed mb-6
                    text-muted-foreground
                    dark:text-dark-muted-foreground
                  "
                >
                  {event.description}
                </p>

                {/* Apply Button */}
                {event.form && (
                  <a
                    href={event.form}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2
                      px-5 py-3 rounded-xl
                      bg-primary text-white
                      hover:opacity-90 transition-all
                    "
                  >
                    Apply Now
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventCard;