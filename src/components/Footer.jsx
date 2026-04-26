import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      background: "radial-gradient(circle, #0f172a, #020617)",
      color: "#cbd5f5",
      padding: "40px",
    },
    topStrip: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #1e293b",
      paddingBottom: "20px",
      marginBottom: "30px",
    },
    button: {
      padding: "10px 20px",
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "100px",
    },
    logo: {
      color: "#3b82f6",
    },
    text: {
      fontSize: "14px",
      marginTop: "10px",
    },
    socials: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    heading: {
      color: "#fff",
      marginBottom: "10px",
    },
    link: {
      fontSize: "14px",
      margin: "5px 0",
      cursor: "pointer",
    },
    bottom: {
      borderTop: "1px solid #1e293b",
      marginTop: "30px",
      paddingTop: "15px",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
    },
  };

  return (
    <footer style={styles.footer}>

      {/* TOP STRIP */}
      <div style={styles.topStrip}>
        <div>
          <h3>Ready to join the community?</h3>
          <p>Connect with 150+ developers and start building together.</p>
        </div>

        <button style={styles.button}>Get Started ↗</button>
      </div>

      {/* MAIN GRID */}
      <div style={styles.container}>

        {/* LEFT */}
        <div>
          <h2 style={styles.logo}>DEVELOPERS<br></br>COMMUNITY</h2>
          <p style={styles.text}>
            A student-led tech community <br></br> at Medi-Caps University,<br></br>
            empowering developers through<br></br> collaboration, mentorship,<br></br>
            and hands-on learning.
          </p>

          <div style={styles.socials}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 style={styles.heading}>Quick Links</h4>
          {["About", "Domains", "Events", "Projects", "Blogs", "Career"].map((item) => (
            <p key={item} style={styles.link}>{item}</p>
          ))}
        </div>

        {/* DOMAINS */}
        <div>
          <h4 style={styles.heading}>Domains</h4>
          {["Web Development", "AI / ML", "Cybersecurity", "Mobile Development", "Open Source"].map((item) => (
            <p key={item} style={styles.link}>• {item}</p>
          ))}
        </div>

        {/* CONTACT */}
        <div>
          <h4 style={styles.heading}>Get in Touch</h4>
          <p style={styles.link}>📧 dev.community@medicaps.ac.in</p>
          <p style={styles.link}>📍 Medi-Caps University, Indore</p>
          <p style={styles.link}>🌐 medicaps.ac.in</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        <p>© {new Date().getFullYear()} Developers' Community</p>
        <p>Made with❤️— Break · Build · Merge</p>
      </div>

    </footer>
  );
};


export default Footer;