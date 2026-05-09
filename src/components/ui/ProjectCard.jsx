import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="
        group overflow-hidden rounded-2xl border
        bg-card text-card-foreground
        border-border shadow-sm hover:shadow-xl
        dark:bg-dark-card dark:text-dark-card-foreground
        dark:border-dark-border
        transition-all
      "
        >
            {/* Thumbnail */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
                />

                <div className="absolute inset-0 from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold mb-1 text-foreground dark:text-dark-foreground">
                    {project.name}
                </h2>

                {/* Sub Heading */}
                <p className="text-sm font-medium text-primary mb-3">
                    {project.subHeading}
                </p>

                {/* Description */}
                <p
                    className="
            text-sm leading-relaxed line-clamp-3 mb-5
            text-muted-foreground dark:text-dark-muted-foreground
          "
                >
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack?.map((tech, idx) => (
                        <span
                            key={idx}
                            className="
                px-3 py-1 rounded-full text-xs font-medium
                bg-primary/10 text-primary
                border border-primary/20
              "
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    {/* GitHub */}
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
    inline-flex items-center gap-2
    px-4 py-2 rounded-xl border
    border-border dark:border-dark-border
    hover:bg-secondary dark:hover:bg-dark-secondary
    transition-all text-sm font-medium
  "
                    >
                        <FaGithub size={18} />
                        GitHub
                    </a>

                    {/* Live Demo */}
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-xl
              bg-primary text-white
              hover:opacity-90 transition-all
              text-sm font-medium
            "
                    >
                        <ExternalLink size={18} />
                        Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;