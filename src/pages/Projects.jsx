import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Layout from "../components/Layout";
import ProjectCard from "../components/ui/ProjectCard";
import Paginator from '../components/ui/Paginator'
import { fetchProjects } from "../controllers/detailsRequest";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  useEffect(() => {
    fetchProjects(page, limit, setProjects, setTotalPages, setLoading);
  }, [page]);

  return (
    <Layout >
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
      {totalPages > 1 && <Paginator page={page} setPage={setPage} totalPages={totalPages} />}

    </Layout>
  );
};

export default Projects;