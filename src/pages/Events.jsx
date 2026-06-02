import React, { useEffect, useState } from "react";
import axios from "axios";

import EventCard from "../components/ui/EventCard";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Paginator from '../components/ui/Paginator'
import { fetchEvents } from "../controllers/detailsRequest";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;


  useEffect(() => {
    fetchEvents({ page, limit, setLoading, setEvents, setTotalPages, });
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
      {totalPages > 1 && <Paginator page={page} setPage={setPage} totalPages={totalPages} />}

    </Layout>
  );
};

export default Events;