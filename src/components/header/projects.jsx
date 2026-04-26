import React from "react";

const AboutSection = () => {
  return (
    <section style={styles.section}>
      
      {/* Grid Background */}
      <div style={styles.gridOverlay}></div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>
          Our <span style={styles.gradientText}>Projects</span>
        </h1>

        <p style={styles.subtext}>
          Real-world projects built by our community members — from hackathons, workshops, and passion-driven ideas.
        </p>
      </div>

    </section>
  );
};

const styles = {
  section: {
    position: "relative",
    padding: "100px 20px",
    textAlign: "center",
    backgroundColor: "#f8fafc",
    overflow: "hidden",
  },

  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    zIndex: 0,
  },

  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "800px",
    margin: "0 auto",
  },

  heading: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "20px",
  },

  gradientText: {
    background: "linear-gradient(90deg, #7c3aed, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtext: {
    fontSize: "18px",
    color: "#6b7280",
    lineHeight: "1.6",
  },
};

export default AboutSection;