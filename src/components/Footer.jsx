import React from "react";

const Footer = () => {
  return (
    <footer
      className="
        px-10 py-10
        bg-secondary text-foreground
        dark:bg-dark-secondary dark:text-dark-foreground
        border-t border-border dark:border-dark-border
      "
    >
      {/* TOP STRIP */}
      <div
        className="
          flex flex-col md:flex-row md:items-center md:justify-between gap-6
          border-b pb-5 mb-8
          border-border dark:border-dark-border
        "
      >
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Ready to join the community?
          </h3>
          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
            Connect with 150+ developers and start building together.
          </p>
        </div>

        <button
          className="
            px-5 py-2 rounded-full text-sm font-semibold transition-all
            bg-primary text-primary-foreground
            hover:opacity-90
            dark:bg-dark-primary dark:text-dark-primary-foreground
          "
        >
          Get Started ↗
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* LEFT */}
        <div>
          <h2 className="text-xl font-bold text-primary dark:text-dark-primary">
            DEVELOPERS <br /> COMMUNITY
          </h2>

          <p className="text-sm mt-3 leading-relaxed text-muted-foreground dark:text-dark-muted-foreground">
            A student-led tech community <br />
            at Medi-Caps University,<br />
            empowering developers through<br />
            collaboration, mentorship,<br />
            and hands-on learning.
          </p>

          <div className="flex gap-3 mt-4">
            <span className="w-4 h-4 rounded-full bg-muted dark:bg-dark-muted" />
            <span className="w-4 h-4 rounded-full bg-muted dark:bg-dark-muted" />
            <span className="w-4 h-4 rounded-full bg-muted dark:bg-dark-muted" />
            <span className="w-4 h-4 rounded-full bg-muted dark:bg-dark-muted" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="mb-3 font-semibold text-foreground dark:text-dark-foreground">
            Quick Links
          </h4>
          {["About", "Domains", "Events", "Projects", "Blogs", "Career"].map(
            (item) => (
              <p
                key={item}
                className="
                  text-sm my-1 cursor-pointer transition-colors
                  text-muted-foreground hover:text-primary
                  dark:text-dark-muted-foreground dark:hover:text-dark-primary
                "
              >
                {item}
              </p>
            )
          )}
        </div>

        {/* DOMAINS */}
        <div>
          <h4 className="mb-3 font-semibold text-foreground dark:text-dark-foreground">
            Domains
          </h4>
          {[
            "Web Development",
            "AI / ML",
            "Cybersecurity",
            "Mobile Development",
            "Open Source",
          ].map((item) => (
            <p
              key={item}
              className="
                text-sm my-1 transition-colors
                text-muted-foreground hover:text-primary
                dark:text-dark-muted-foreground dark:hover:text-dark-primary
              "
            >
              • {item}
            </p>
          ))}
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="mb-3 font-semibold text-foreground dark:text-dark-foreground">
            Get in Touch
          </h4>
          <p className="text-sm my-1 text-muted-foreground dark:text-dark-muted-foreground">
            📧 dev.community@medicaps.ac.in
          </p>
          <p className="text-sm my-1 text-muted-foreground dark:text-dark-muted-foreground">
            📍 Medi-Caps University, Indore
          </p>
          <p className="text-sm my-1 text-muted-foreground dark:text-dark-muted-foreground">
            🌐 medicaps.ac.in
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="
          mt-10 pt-4 flex flex-col md:flex-row justify-between gap-3 text-xs
          border-t
          border-border dark:border-dark-border
          text-muted-foreground dark:text-dark-muted-foreground
        "
      >
        <p>© {new Date().getFullYear()} Developers' Community</p>
        <p>Made with ❤️ — Break · Build · Merge</p>
      </div>
    </footer>
  );
};

export default Footer;