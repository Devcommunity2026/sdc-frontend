import DomainCard from "../components/ui/DomainCard";

export default function Domains() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Our Domains</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <DomainCard
          title="Web Development"
          description="Build modern and responsive websites."
          icon="web"
        />

        <DomainCard
          title="AI/ML"
          description="Explore artificial intelligence and machine learning."
          icon="ai"
        />

        <DomainCard
          title="Cyber Security"
          description="Learn ethical hacking and system security."
          icon="security"
        />
      </div>
    </div>
  );
}