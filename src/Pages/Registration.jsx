import React from "react"
import Form from "../components/Registration/Form"
import Navbar from "../components/Navbar"
import ContactUs from "../components/ContactUs"
import { useLocation } from "react-router-dom"

const Registration = () => {
  const location = useLocation()
  // console.log(location.state)
  // console.log(location.search.split("&")[1].split("=")[1])

  return (
    <>
      <div className="bg-black font-Lato">
        <Navbar />
        <div className="relative mt-8 overflow-hidden pb-8 lg:px-14 lg:pb-5 xl:px-20">
          <div className="lg:mt-14 xl:ml-7">
            <h1 className="text-center font-Bebas text-5xl uppercase text-primary btwnMdAndLg:text-6xl lg:text-left lg:text-[70px]">
              <span className="border-b-2 border-secondary">
                {location.state?.event ||
                  location.search.split("&")[1].split("=")[1]}
              </span>{" "}
              Registration
            </h1>

            <p className="mt-8 px-5 text-secondary xs:px-7 md:text-lg lg:w-4/5 lg:px-0 lg:text-xl">
              {location.state?.event_description ||
                location.search
                  .split("&")[2]
                  .split("=")[1]
                  .split("%20")
                  .join(" ")}
            </p>
          </div>
        </div>

        {/* Need to use the url param path also, cause if any user landed directly to link, then state will be empty */}
        <Form
          event_name={
            location.state?.event || location.search.split("&")[0].split("=")[1]
          }
        />
        <ContactUs />
      </div>
    </>
  )
}

export default Registration
