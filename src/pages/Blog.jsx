import React from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import blogs from "../data/blogs";
import BlogCard from "../components/ui/BlogCard";

function Blogs() {
  return (
    <Layout>
      <Header
        heading1={'Blogs & '}
        heading2={'Resources'}
        subtext={``}
      />

      <div className="px-6 py-10 max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-8">
          Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </Layout>
  );
}

export default Blogs;