import React from "react"
import EventsPage from "../components/Events/EventsPage"
import Navbar from "../components/Navbar"
import AnnouncementBar from "../components/AnnouncementBar"
import ContactUs from "../components/ContactUs"

const Events = () => {
  return (
    <div className="bg-black font-Lato">
      <AnnouncementBar />
      <Navbar />
      <EventsPage />
      <ContactUs />
    </div>
  )
}

export default Events
