import Layout from "../components/Layout";
import Header from "../components/Header";

// UI components
import Button from "../components/ui/Button";
import DomainCard from "../components/ui/DomainCard";
import EventCard from "../components/ui/EventCard";
import SectionHeading from "../components/ui/SectionHeading";
import StatCounter from "../components/ui/StatsCounter";
import MentorCard from "../components/ui/MentorCard";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
import { communityStats, domains, events, mentors } from "../data/mockData";

const Home = () => {
  return (
    <Layout>

      {/* Header */}
      <Header
        heading1="About"
        heading2="Our Community"
        subtext="We're on a mission to empower student developers with the skills, mentorship, and community they need to thrive."
      />

      {/* Hero */}
      <section className="py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Empowering <span className="text-primary">Developers</span>
        </motion.h1>

        <p className="mt-4 text-muted-foreground">
          Join a thriving developer community and build real-world projects.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link to="/career">
              Apply Now <ArrowRight size={18} />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <span className="text-sm font-semibold text-primary uppercase">
                Who We Are
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                A Community That <span className="text-primary">Codes Together</span>
              </h2>

              <p className="mt-4 text-muted-foreground">
                We're a student-led developers community focused on bridging the gap
                between academic learning and real-world tech skills.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">💻</div>
                  <p>Hands-on workshops and coding sessions</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">👥</div>
                  <p>Peer-to-peer learning and mentorship</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">🏆</div>
                  <p>Hackathons and competitive programming</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="bg-muted p-8 rounded-2xl grid grid-cols-2 gap-4">
              {["React", "Python", "TensorFlow", "Docker", "Git", "AWS"].map((tech) => (
                <div
                  key={tech}
                  className="bg-background p-4 rounded-xl text-center shadow"
                >
                  {tech}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {communityStats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Domains */}
      <section className="py-16">
        <SectionHeading
          title="Our Domains"
          subtitle="Explore different areas of technology"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.slice(0, 3).map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="py-16">
        <SectionHeading title="Events" subtitle="Upcoming events" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16">
        <SectionHeading title="Mentors" subtitle="Learn from experts" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, i) => (
            <MentorCard key={mentor.name} mentor={mentor} index={i} />
          ))}
        </div>
      </section>

    </Layout>
  );
};

export default Home;