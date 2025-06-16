import React from "react"
import EventsPage from "../components/Events/EventsPage"
import Navbar from "../components/Navbar"
import ContactUs from "../components/ContactUs"

const Events = () => {
  return (
    <div className="bg-black font-Lato">
      <Navbar />
      <EventsPage />
      <ContactUs />
    </div>
  )
}

export default Events
