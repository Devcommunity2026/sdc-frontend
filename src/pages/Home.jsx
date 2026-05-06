import Layout from "../components/Layout";
import HomeHeader from "../components/HomeHeader";

// UI components
import Button from "../components/ui/Button";
import DomainCard from "../components/ui/DomainCard";
import EventCard from "../components/ui/EventCard";
import SectionHeading from "../components/ui/SectionHeading";
import StatCounter from "../components/ui/StatsCounter";
import MentorCard from "../components/ui/MentorCard";

import { motion } from "framer-motion";
import { ArrowRight, Laptop, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
import { communityStats, domains, events, mentors } from "../data/mockData";

const Home = () => {
  return (
    <>
      <HomeHeader />
      <div className="px-20">
        {/* Stats */}
        <section className="py-12 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div>
                <SectionHeading
                  badge="Who We Are"
                  title={
                    <>
                      A Community That{" "}
                      <span className="text-primary dark:text-dark-primary">
                        Codes Together
                      </span>
                    </>
                  }
                  subtitle="We bring developers together to learn, build, and grow through real-world collaboration and hands-on experience."
                  center={false}
                />

                <div className="mt-6 space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-dark-primary/10">
                      <Laptop className="w-5 h-5 text-primary dark:text-dark-primary" />
                    </div>
                    <p className="text-foreground dark:text-dark-foreground">
                      Hands-on workshops and coding sessions
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-dark-primary/10">
                      <Users className="w-5 h-5 text-primary dark:text-dark-primary" />
                    </div>
                    <p className="text-foreground dark:text-dark-foreground">
                      Peer-to-peer learning and mentorship
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-dark-primary/10">
                      <Trophy className="w-5 h-5 text-primary dark:text-dark-primary" />
                    </div>
                    <p className="text-foreground dark:text-dark-foreground">
                      Hackathons and competitive programming
                    </p>
                  </div>

                </div>
              </div>

              {/* Right */}
              <div
                className="
                p-8 rounded-2xl grid grid-cols-2 gap-4
                bg-muted dark:bg-dark-muted
              "
              >
                {["React", "Python", "TensorFlow", "Docker", "Git", "AWS"].map((tech) => (
                  <div
                    key={tech}
                    className="
                    p-4 rounded-xl text-center
                    bg-background text-foreground
                    border border-border
                    dark:bg-dark-background dark:text-dark-foreground dark:border-dark-border
                  "
                  >
                    {tech}
                  </div>
                ))}
              </div>

            </div>
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
          <SectionHeading
            title="Events"
            subtitle="Upcoming events"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </section>

        {/* Mentors */}
        <section className="py-16">
          <SectionHeading
            title="Mentors"
            subtitle="Learn from experts"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor, i) => (
              <MentorCard key={mentor.name} mentor={mentor} index={i} />
            ))}
          </div>
        </section>
      </div>

    </>
  );
};

export default Home;