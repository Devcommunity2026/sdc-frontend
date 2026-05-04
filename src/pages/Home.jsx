import React from "react";
import Header from "../components/Header";
import StatsSection from "../components/StatsSection";

const Home = () => {
  return (
    <div>
      <Header
        heading1={"Empowering Developers" }
        heading2={"Through Community"}
        subtext={"Join a thriving community of student developers. Learn, collaborate, and build real-world projects with mentorship from industry experts.."}
      />

      {/* ✅ STATS SECTION */}
      <StatsSection />
    </div>
  );
};

export default Home;