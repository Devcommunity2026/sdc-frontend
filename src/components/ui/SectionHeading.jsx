import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({ badge, title, subtitle, center = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 lg:mb-16 ${center ? "text-center" : ""}`}
  >
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
        {badge}
      </span>
    )}

    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
      {title}
    </h2>

    {subtitle && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;