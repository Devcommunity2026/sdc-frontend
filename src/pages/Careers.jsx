import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";

import Layout from "../components/Layout";
import Button from "../components/ui/Button";

import { domains } from "../data/mockData";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  college: "",
  branch: "",
  year: "",
  skills: "",
  github: "",
  linkedin: "",
  domain: "",
  motivation: "",
  resume: null,
};

const Careers = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("========== FORM SUBMITTED ==========");
    console.log(form);

    console.log("Name:", form.name);
    console.log("Email:", form.email);
    console.log("Phone:", form.phone);
    console.log("College:", form.college);
    console.log("Selected Domain:", form.domain);

    // Resume details
    console.log("Resume File:", form.resume);

    if (form.resume) {
      console.log("Resume Name:", form.resume.name);
      console.log("Resume Type:", form.resume.type);
      console.log("Resume Size:", form.resume.size, "bytes");
    }

    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Application Submitted!
            </h2>

            <p className="text-muted-foreground">
              Your application has been submitted successfully.
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Join <span className="text-primary">Our Community</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Fill out the application form below and become part of our
          developer community.
        </motion.p>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 md:p-10 border space-y-5"
          >
            <h2 className="text-2xl font-bold mb-2">
              Application Form
            </h2>

            {/* Basic Details */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2">Full Name *</label>

                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block mb-2">Email *</label>

                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="john@email.com"
                />
              </div>

              <div>
                <label className="block mb-2">Phone *</label>

                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block mb-2">College *</label>

                <input
                  name="college"
                  required
                  value={form.college}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="College Name"
                />
              </div>

              <div>
                <label className="block mb-2">Branch *</label>

                <input
                  name="branch"
                  required
                  value={form.branch}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="CSE / IT / ECE"
                />
              </div>

              <div>
                <label className="block mb-2">Year *</label>

                <select
                  name="year"
                  required
                  value={form.year}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block mb-2">
                Technical Skills *
              </label>

              <input
                name="skills"
                required
                value={form.skills}
                onChange={handleChange}
                className={inputClass}
                placeholder="React, Python, Java"
              />
            </div>

            {/* Social Links */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2">
                  GitHub Profile
                </label>

                <input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block mb-2">
                  LinkedIn Profile
                </label>

                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block mb-2">
                Upload Resume *
              </label>

              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Domain */}
            <div>
              <label className="block mb-2">
                Domain Interested In *
              </label>

              <select
                name="domain"
                required
                value={form.domain}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Domain</option>

                {domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Motivation */}
            <div>
              <label className="block mb-2">
                Why do you want to join? *
              </label>

              <textarea
                name="motivation"
                required
                value={form.motivation}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                placeholder="Tell us about your motivation..."
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Submit Application
            </Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;