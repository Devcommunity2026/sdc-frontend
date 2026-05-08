function BlogCard({ blog }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">

      {/* Image */}
      <img
        src={blog.image}
        alt="blog"
        className="w-full h-40 object-cover"
        onError={(e) =>
          (e.target.src =
            "https://images.unsplash.com/photo-1518770660439-4636190af475")
        }
      />

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400">
          {blog.date} • {blog.readTime}
        </p>

        <h2 className="text-sm font-semibold text-white mt-2">
          {blog.title}
        </h2>

        <p className="text-gray-400 text-xs mt-2 line-clamp-2">
          {blog.desc}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;