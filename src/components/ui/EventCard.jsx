import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ExternalLink, Clock } from "lucide-react";

const EventCard = ({ event, index }) => {
  const [open, setOpen] = useState(false);
  const isEventEnded = new Date(event.date) < new Date();

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        onClick={() => setOpen(true)}
        className="cursor-pointer group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900"
      >
        {/* Thumbnail */}
        <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={event.thumbnail || event.image}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Ended badge */}
          {isEventEnded && (
            <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/50 text-gray-300 backdrop-blur-sm">
              Ended
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-2">
            <Calendar size={13} />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-gray-100 leading-snug">
            {event.name}
          </h3>

          {/* Sub-heading */}
          {event.subHeading && (
            <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400 mb-2">
              {event.subHeading}
            </p>
          )}

          {/* Description preview */}
          <p className="text-sm leading-relaxed line-clamp-2 text-gray-500 dark:text-gray-400">
            {event.description}
          </p>

          {/* Read more hint */}
          <p className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to read more →
          </p>
        </div>
      </motion.div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="h-56 sm:h-72 w-full shrink-0 bg-gray-100 dark:bg-gray-800">
                <img
                  src={event.thumbnail || event.image}
                  alt={event.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Scrollable body */}
              <div className="p-6 overflow-y-auto">
                {/* Date */}
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-2">
                  <Calendar size={15} />
                  <span>{formattedDate}</span>
                </div>

                {/* Name */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 leading-snug">
                  {event.name}
                </h2>

                {/* Sub-heading */}
                {event.subHeading && (
                  <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 mb-4">
                    {event.subHeading}
                  </p>
                )}

                {/* Full description */}
                <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                  {event.description}
                </p>

                {/* CTA */}
                {event.form && (
                  isEventEnded ? (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-sm font-medium cursor-not-allowed"
                    >
                      <Clock size={16} />
                      Event Ended
                    </button>
                  ) : (
                    <a
                      href={event.form}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                    >
                      Apply Now
                      <ExternalLink size={16} />
                    </a>
                  )
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