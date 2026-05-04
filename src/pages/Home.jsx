import React from "react";
import Header from "../components/Header";
import StatsSection from "../components/StatsSection";

const Home = () => {
  return (
    <div>
      <Header
        heading1={"About"}
        heading2={"Our Community"}
        subtext={"We’re on a mission to empower student developers."}
      />

      {/* ✅ STATS SECTION */}
      <StatsSection />
    </div>
  );
};

export default Home;