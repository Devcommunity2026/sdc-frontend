import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import TeamCard from "../components/ui/TeamCard";
import MentorCard from "../components/ui/MentorCard";
import Layout from "../components/Layout";
import Header from "../components/Header";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  const fetchPeopleData = async () => {
    try {
      setLoading(true);

      const [teamRes, mentorRes] = await Promise.all([
        axios.get("http://localhost:3000/public/team"),

        axios.get(
          "http://localhost:3000/public/mentor?page=1&limit=6"
        ),
      ]);

      // Team
      if (teamRes.data.success) {
        setTeamMembers(teamRes.data.data);
      }

      // Mentors
      if (mentorRes.data.success) {
        setMentors(mentorRes.data.data);
      }

    } catch (error) {
      console.error("Failed to fetch people data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleData();
  }, []);

  return (
    <Layout>

      {/* ================= HERO SECTION ================= */}

      <Header
        heading1="Our"
        heading2="Team"
        subtext="Meet the talented individuals who drive our
            community forward."
      />

      {/* ================= CORE TEAM ================= */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-14">

            <span
              className="
                inline-flex items-center rounded-full
                px-4 py-1 text-sm font-medium mb-4
                bg-primary/10 text-primary
              "
            >
              The Team
            </span>

            <h2
              className="
                text-3xl md:text-4xl font-bold mb-4
                text-foreground dark:text-dark-foreground
              "
            >
              Core{" "}

              <span className="text-primary dark:text-dark-primary">
                Team
              </span>
            </h2>

            <p
              className="
                max-w-2xl mx-auto
                text-muted-foreground dark:text-dark-muted-foreground
              "
            >
              The dedicated student leaders who organize
              and manage our community.
            </p>
          </div>

          {/* Team Cards */}
          {loading ? (
            <div className="text-center text-lg">
              Loading Team...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <TeamCard
                  key={member._id}
                  member={member}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= MENTORS ================= */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-dark-background">

        {/* Blur */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full blur-[120px] bg-primary/10" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">

          {/* Heading */}
          <div className="text-center mb-14">

            <span
              className="
                inline-flex items-center rounded-full
                px-4 py-1 text-sm font-medium mb-4
                bg-primary/10 text-primary
              "
            >
              Guidance
            </span>

            <h2
              className="
                text-3xl md:text-4xl font-bold mb-4 text-white
              "
            >
              Our{" "}

              <span className="text-primary dark:text-dark-primary">
                Mentors
              </span>
            </h2>

            <p
              className="
                max-w-2xl mx-auto
                text-dark-muted-foreground
              "
            >
              Industry experts who volunteer their time to
              guide our community members.
            </p>
          </div>

          {/* Mentor Cards */}
          {loading ? (
            <div className="text-center text-white text-lg">
              Loading Mentors...
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, i) => (
                <MentorCard
                  key={mentor._id}
                  mentor={mentor}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </Layout>
  );
};

export default Team;