import React from "react";
import TeamCard from "../components/ui/TeamCard";
import Header from '../components/Header'
import Layout from "../components/Layout";

const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/150?img=1",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=2",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=3",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Sara Khan",
      role: "Full Stack Developer",
      image: "https://i.pravatar.cc/150?img=4",
      linkedin: "https://www.linkedin.com/",
    },
  ];

  return (

    <Layout>
      <Header
        heading1={'Our  '}
        heading2={'Team'}
        subtext={`Meet the talented individuals who drive our community forward.`} />
      <div className="pt-24 px-6 md:px-12">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Meet Our Team
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default Team;