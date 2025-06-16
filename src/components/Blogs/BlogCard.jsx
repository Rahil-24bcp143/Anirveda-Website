import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, author, date, excerpt, image }) => {
  return (
    <div className="p-4 mr-4 bg-black border border-secondary rounded-lg shadow-md transform hover:scale-105 hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-Bebas text-secondary mb-2">{title}</h2>
      <p className="text-sm text-secondary mb-2">
        By <span className="font-medium">{author}</span> | {date}
      </p>
      <p className="text-secondary line-clamp-3 mb-4">{excerpt}</p>
      <Link
        to={`/blogs/${id}`}
        className="text-secondary font-bold underline hover:text-secondary transition"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;