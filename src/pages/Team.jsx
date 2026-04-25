import React from "react";
import TeamCard from "../components/ui/TeamCard";
const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jane Smith",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Sara Khan",
      role: "Full Stack Developer",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];

  return (
    <div className="pt-24 px-6 md:px-12">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Meet Our Team
      </h1>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} index={index} />
        ))}
      </div>

    </div>
  );
};

export default Team;