import React, { useEffect, useState } from "react";
import axios from "axios";

import EventCard from "../components/ui/EventCard";
import Header from "../components/Header";
import Layout from "../components/Layout";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  const fetchEvents = async (currentPage) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/public/event?page=${currentPage}&limit=${limit}`
      );

      if (res.data.success) {
        setEvents(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <Layout>
      <Header
        heading1={"Upcoming "}
        heading2={"Events"}
        subtext={""}
      />

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading Events...</p>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <EventCard
              key={event._id}
              event={{
                ...event,
                image: event.thumbnail || event.image,
              }}
              index={index}
            />
          ))
        ) : (
          <p>No Events Found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg border transition-all ${
                  page === i + 1
                    ? "bg-primary text-white"
                    : "bg-transparent"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Events;