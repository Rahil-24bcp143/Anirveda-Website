import React from "react";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import BlogCard from "../components/Blogs/BlogCard";
import blogData from "../data/blogs";

const Blogs = () => {
  return (
    <div className="bg-black text-white font-Lato min-h-screen">
      {/* Navbar */}
      <section>
        <Navbar />
      </section>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary-opacity to-black py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-Yeseva text-primary mb-4">Our Blogs</h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Explore insights, tips, and stories curated just for you.
          </p>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            author={blog.author}
            date={blog.date}
            excerpt={blog.excerpt}
            image={blog.image}
          />
        ))}
      </div>

      {/* Contact Us */}
      <ContactUs />
    </div>
  );
};

export default Blogs;