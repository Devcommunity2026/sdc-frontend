import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, BookOpen, Users, Rocket } from "lucide-react";

import Layout from "../components/Layout";
import SectionHeading from "../components/ui/SectionHeading";

const values = [
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "We believe in lifelong learning and staying ahead of technology trends.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Great things are built together. We foster teamwork and open communication.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    desc: "We encourage creative problem-solving and building solutions that matter.",
  },
  {
    icon: Lightbulb,
    title: "Mentorship",
    desc: "Every beginner deserves guidance. Our mentors are here to help you grow.",
  },
];

// 🔥 Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -left-32 top-0 w-96 h-96 bg-secondary/25 rounded-full blur-[140px]" />
        <div className="absolute -right-32 bottom-0 w-96 h-96 bg-secondary/20 rounded-full blur-[140px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold"
          >
            About <span className="gradient-text">Our Community</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We're on a mission to empower student developers with the skills,
            mentorship, and community they need to thrive.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="gradient-card rounded-2xl p-8 border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                <Target size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To create a collaborative ecosystem where student developers can
                learn cutting-edge technologies and work on real-world projects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="gradient-card rounded-2xl p-8 border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-4">
                <Eye size={24} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become a leading student developer community producing
                industry-ready engineers and innovators.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 gradient-purple-section relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="What We Believe"
            title={
              <>
                Our Core <span className="gradient-text">Values</span>
              </>
            }
            subtitle="These values guide everything we do."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="gradient-card rounded-2xl p-6 border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;