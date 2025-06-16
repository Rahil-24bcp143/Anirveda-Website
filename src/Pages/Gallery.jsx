import React from "react"
import Navbar from "../components/Navbar"
import AllImages from "../components/Gallery/AllImages"

const Gallery = () => {
  return (
    <div className="bg-black font-Lato">
      <div className="h-[80vh]flex flex-col">
        <Navbar />
        <AllImages />
      </div>
    </div>
  )
}

export default Gallery
