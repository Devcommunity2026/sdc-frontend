import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Layout from "../components/Layout";
import ProjectCard from "../components/ui/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  const fetchProjects = async (currentPage) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/public/project?page=${currentPage}&limit=${limit}`
      );

      if (res.data.success) {
        setProjects(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  return (
    <Layout>
      <Header
        heading1={"Our "}
        heading2={"Projects"}
        subtext={`Real-world projects built by our community members — from hackathons, workshops, and passion-driven ideas.`}
      />

      {/* Projects Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading Projects...</p>
        ) : projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
            />
          ))
        ) : (
          <p>No Projects Found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pb-10">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="
              px-4 py-2 rounded-xl border
              border-border dark:border-dark-border
              disabled:opacity-50
              hover:bg-secondary dark:hover:bg-dark-secondary
              transition-all
            "
          >
            Prev
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  w-10 h-10 rounded-xl border transition-all
                  ${
                    page === i + 1
                      ? "bg-primary text-white border-primary"
                      : "border-border dark:border-dark-border hover:bg-secondary dark:hover:bg-dark-secondary"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="
              px-4 py-2 rounded-xl border
              border-border dark:border-dark-border
              disabled:opacity-50
              hover:bg-secondary dark:hover:bg-dark-secondary
              transition-all
            "
          >
            Next
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Projects;