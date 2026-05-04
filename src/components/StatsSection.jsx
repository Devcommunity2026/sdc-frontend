import { useEffect, useState } from "react";

const stats = [
  { label: "Members", value: 150 },
  { label: "Events", value: 25 },
  { label: "Workshops", value: 40 },
  { label: "Mentors", value: 12 },
];

// 🔥 DIGIT SCROLL COMPONENT
const Digit = ({ number }) => {
  return (
    <div style={styles.digitWrapper}>
      <div
        style={{
          ...styles.digitTrack,
          transform: `translateY(-${number * 10}%)`,
        }}
      >
        {[...Array(10).keys()].map((n) => (
          <div key={n} style={styles.digit}>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};

// 🔥 NUMBER COUNTER WITH REEL EFFECT
const ReelCounter = ({ value }) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start++;
      setNum(start);
      if (start >= value) clearInterval(interval);
    }, 2);

    return () => clearInterval(interval);
  }, [value]);

  const digits = num.toString().split("");

  return (
    <div style={{ display: "flex" }}>
      {digits.map((d, i) => (
        <Digit key={i} number={parseInt(d)} />
      ))}
      <span style={{ marginLeft: "2px" }}>+</span>
    </div>
  );
};

const StatsSection = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {stats.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.number}>
              <ReelCounter value={item.value} />
            </div>
            <p style={styles.label}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "60px 20px",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    width: "180px",
    height: "100px",
    background: "#f1f5f9",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    display: "flex",
    fontSize: "24px",
    fontWeight: "700",
    color: "#8b5cf6",
  },

  label: {
    fontSize: "14px",
    color: "#64748b",
  },

  digitWrapper: {
    height: "28px",
    overflow: "hidden",
  },

  digitTrack: {
    transition: "transform 0.3s ease",
  },

  digit: {
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default StatsSection;