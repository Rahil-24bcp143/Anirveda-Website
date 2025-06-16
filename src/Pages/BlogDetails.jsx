import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogData from "../data/blogs";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find((blog) => blog.id === parseInt(id));

  useEffect(() => {
    document.title = blog ? `${blog.title} | My Blog` : "Blog Not Found | My Blog";
  }, [blog]);

  if (!blog) {
    return (
      <div className="text-center text-gray-200 bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-red-500 mt-8">Blog Not Found</h1>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={() => navigate("/blogs")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#E3ECF7] min-h-screen font-sans px-4 md:px-6 pt-2 pb-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/blogs")}
        className="fixed top-3 left-3 md:top-6 md:left-6 w-[10%] md:w-auto flex items-center gap-2 bg-[#000000] text-white px-4 md:px-5 py-2 rounded-full shadow-md hover:bg-[#162D66] transition-all text-sm md:text-lg font-medium z-50"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.7 1.7L6.4 10l4.3 5.3a1 1 0 01-1.4 1.4l-5-6a1 1 0 010-1.4l5-6A1 1 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Blog Content */}
      <div className="max-w-full md:max-w-[85%] lg:max-w-[75%] mx-auto p-6 md:p-8 bg-white text-gray-900 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl mt-10 md:mt-20">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-md mb-6 shadow-md hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>
        <p className="text-sm md:text-lg text-gray-700 mb-6 italic">
          <span className="font-medium">{blog.author}</span> &middot; {blog.date}
        </p>
        <div
          className="text-base md:text-xl text-gray-800 leading-relaxed text-justify indent-8 space-y-6"
          dangerouslySetInnerHTML={{
            __html: blog.content
              .replace(
                /<h2>(.*?)<\/h2>/g,
                '<h2 class="text-2xl md:text-4xl font-bold text-gray-900 mt-10 mb-6 border-b-2 border-gray-300 pb-2">$1</h2>'
              )
              .replace(
                /<p>(.*?)<\/p>/g,
                '<p class="text-base md:text-lg text-gray-700 leading-relaxed mb-4">$1</p>'
              )
          }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;