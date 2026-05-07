import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";

import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Header from "../components/Header";
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

    setSubmitted(true);
  };

  const inputClass = `
    w-full rounded-xl px-4 py-3 text-sm transition-all outline-none
    bg-background text-foreground placeholder:text-muted-foreground
    border border-border
    focus:ring-2 focus:ring-primary/30 focus:border-primary

    dark:bg-dark-background
    dark:text-dark-foreground
    dark:placeholder:text-dark-muted-foreground
    dark:border-dark-border
    dark:focus:ring-dark-primary/30
    dark:focus:border-dark-primary
  `;

  const labelClass = `
    block mb-2 font-medium text-sm
    text-foreground dark:text-dark-foreground
  `;

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center bg-background dark:bg-dark-background px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
              text-center max-w-md w-full rounded-3xl p-10 border
              bg-card border-border
              dark:bg-dark-card dark:border-dark-border
            "
          >
            <div
              className="
                w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6
                bg-primary dark:bg-dark-primary
              "
            >
              <CheckCircle
                size={40}
                className="text-primary-foreground dark:text-dark-primary-foreground"
              />
            </div>

            <h2 className="text-3xl font-bold mb-3 text-foreground dark:text-dark-foreground">
              Application Submitted!
            </h2>

            <p className="text-muted-foreground dark:text-dark-muted-foreground">
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
      <Header
        heading1="Join "
        heading2="Our Community"
        subtext="Fill out the application form below and become part of our developer community."
      />

      {/* Form Section */}
      <section className="py-16 bg-muted dark:bg-dark-secondary">
        <div className="container mx-auto px-4 max-w-3xl">

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="
              rounded-3xl p-6 md:p-10 space-y-6 border shadow-sm
              bg-card border-border
              dark:bg-dark-card dark:border-dark-border
            "
          >
            {/* Heading */}
            <div>
              <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground">
                Application Form
              </h2>

              <p className="mt-2 text-sm text-muted-foreground dark:text-dark-muted-foreground">
                Fill in your details carefully before submitting.
              </p>
            </div>

            {/* Basic Details */}
            <div className="grid sm:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Full Name *</label>

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
                <label className={labelClass}>Email *</label>

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
                <label className={labelClass}>Phone *</label>

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
                <label className={labelClass}>College *</label>

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
                <label className={labelClass}>Branch *</label>

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
                <label className={labelClass}>Year *</label>

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
              <label className={labelClass}>Technical Skills *</label>

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
                <label className={labelClass}>GitHub Profile</label>

                <input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className={labelClass}>LinkedIn Profile</label>

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
              <label className={labelClass}>Upload Resume *</label>

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
              <label className={labelClass}>Domain Interested In *</label>

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
              <label className={labelClass}>
                Why do you want to join? *
              </label>

              <textarea
                name="motivation"
                required
                value={form.motivation}
                onChange={handleChange}
                rows={5}
                className={`${inputClass} resize-none`}
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