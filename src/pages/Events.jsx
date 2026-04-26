import React from 'react'
import EventCard from "../components/ui/EventCard";
const eventsData = [
  {
    id: "1",
    title: "Hackathon 2026",
    description: "Join us for an exciting coding competition.",
    date: "2026-05-10",
    image: "https://via.placeholder.com/400x200",
    registrationLink: "#",
  },
  {
    id: "2",
    title: "AI Workshop",
    description: "Hands-on session on Machine Learning.",
    date: "2026-06-15",
    image: "https://via.placeholder.com/400x200",
    registrationLink: "#",
  },
];
const Events = () => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {eventsData.map((event, index) => (
    <EventCard key={event.id} event={event} index={index} />
  ))}
</div>
  )
}

export default Events