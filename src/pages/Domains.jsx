import React from 'react'
import DomainCard from "../components/ui/DomainCard";
const domains = [
  {
    id: "1",
    title: "Web Development",
    description: "Build modern websites",
    icon: "Globe",
    color: "primary",
  },
   {
    id: "2",
    title: "AI / ML",
    description: "Explore machine learning and AI concepts",
    icon: "Brain",
    color: "primary",
  },
  {
    id: "3",
    title: "Cyber Security",
    description: "Learn how to secure systems and networks",
    icon: "Shield",
    color: "primary",
  },
  // you can add more later
];
const Domains = () => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {domains.map((domain, index) => (
    <DomainCard key={domain.id} domain={domain} index={index} />
  ))}
</div>
  )
}

export default Domains