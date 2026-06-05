import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog, index, onClick }) => {
  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      viewport={{ once: true }}
      onClick={onClick}
      className="
        group relative overflow-hidden rounded-2xl cursor-pointer
        bg-card text-card-foreground
        border border-border/80 shadow-md hover:shadow-2xl hover:shadow-primary/10
        dark:bg-dark-card dark:text-dark-card-foreground
        dark:border-dark-border dark:hover:shadow-dark-primary/10
        transition-all duration-300 flex flex-col h-[420px] justify-between
      "
    >
      {/* Glow Effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Thumbnail Area */}
        <div className="relative h-48 overflow-hidden bg-muted dark:bg-dark-muted">
          <img
            src={blog.thumbnail || blog.image}
            alt={blog.title}
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-108 group-hover:rotate-1
            "
          />
          {/* Glassmorphic Category Badge floating top-left */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="
                text-[10px] font-extrabold uppercase tracking-widest
                bg-background/80 dark:bg-dark-background/85
                backdrop-blur-md text-primary dark:text-dark-primary
                border border-border/50 dark:border-dark-border/50
                px-3 py-1 rounded-full shadow-sm
              ">
                {blog.tags[0]}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 dark:from-dark-background/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-xs font-semibold text-primary dark:text-dark-primary flex items-center gap-1">
              Read Article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-5 flex flex-col">
          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-dark-muted-foreground mb-3 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={12} className="text-muted-foreground/80" />
              {formattedDate}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border dark:bg-dark-border" />
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={12} className="text-muted-foreground/80" />
              {blog.readTime || "5 min read"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold line-clamp-2 mb-2 text-foreground dark:text-dark-foreground group-hover:text-primary dark:group-hover:text-dark-primary transition-colors duration-200 leading-snug">
            {blog.title}
          </h3>

          {/* Description Subheading */}
          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground line-clamp-2 leading-relaxed">
            {blog.subHeading || blog.desc}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-border/40 dark:border-dark-border/40 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-semibold text-foreground/80 dark:text-dark-foreground/80">
          <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-dark-primary/15 flex items-center justify-center">
            <User size={12} className="text-primary dark:text-dark-primary" />
          </div>
          {blog.author || "Admin"}
        </span>
        
        <span className="flex items-center gap-1 text-xs font-bold text-primary dark:text-dark-primary group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200">
          Read More
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </div>
    </motion.div>
  );
};

export default BlogCard;
