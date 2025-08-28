import React from 'react'
import Navbar from "../components/Navbar"
import AnnouncementBar from "../components/AnnouncementBar"
import Main from "../components/Home/Main"
import BigText from "../components/Home/BigText"
import About from "../components/Home/About"
import ContactUs from "../components/ContactUs"
import Testimonial from "../components/Home/Testimonial"

import StaggeredDropDown from "../components/Home/StaggeredDropDown";


const HomePage = () => { 

  return (
    <div className="bg-black font-Lato">
      <AnnouncementBar />
      <div className="h-[80vh]flex flex-col">
        <Navbar />
        <Main />
      </div>
      <BigText />
      <About />
      <StaggeredDropDown/>

      <Testimonial/>
      <ContactUs />
    </div>
  )
}

export default HomePage
