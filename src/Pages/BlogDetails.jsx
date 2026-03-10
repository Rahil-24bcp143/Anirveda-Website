import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../data/blogs";
import Navbar from "../components/Navbar";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-white">
        Blog not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-Lato">

      {/* Navbar */}
      <Navbar />

      {/* TOP ANNOUNCEMENT */}
      <div className="bg-primary text-black text-center py-2 font-semibold text-sm">
        Take the MOCK-RBI Challenge on 10th October
      </div>

      {/* BLOG CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <Link to="/blogs" className="hover:text-primary">Blogs</Link> / Tech & Economics
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-Bebas text-primary mb-6">
          {blog.title}
        </h1>

        {/* META */}
        <div className="flex items-center gap-6 border-y border-gray-800 py-6 mb-10">
          <div>
            <p className="font-semibold">{blog.author}</p>
            <p className="text-gray-400 text-sm">{blog.date}</p>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-12">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* ARTICLE */}
        <article className="bg-[#111111] border border-gray-800 rounded-xl p-8 md:p-12">

          {/* Intro */}
          <p className="text-xl text-gray-300 italic mb-10 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Content */}
          <div
            className="space-y-6 text-gray-300 leading-8 text-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* AUTHOR SECTION */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 mt-12">
          <h3 className="font-semibold text-xl mb-2 text-white">
            About the Author
          </h3>

          <p className="text-gray-400">
            Our research team explores technology, entrepreneurship, and economics.
            We publish insights on emerging trends shaping the future of business.
          </p>
        </div>

        {/* RELATED BLOGS */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mt-10 mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">

            Related Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {blogData.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/blogs/${item.id}`}
                className="bg-[#111111] border border-gray-800 rounded-xl hover:border-primary transition overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {item.excerpt.slice(0, 80)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default BlogDetails;
