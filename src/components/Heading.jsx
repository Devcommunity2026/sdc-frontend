const Heading = ({ heading1, heading2 }) => {
  return (
    <div className="text-center">
      {/* Line 1 */}
      <h1 className="text-6xl md:text-7xl font-bold text-black">
        {heading1}
      </h1>

      {/* Line 2 */}
      <h1 className="text-6xl md:text-7xl font-bold text-purple-500">
        {heading2}
      </h1>
    </div>
  );
};

export default Heading;