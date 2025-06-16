import React from "react"
import Navbar from "../components/Navbar"
import ProfileCard from "../components/Committee/ProfileCard"
import Departments from "../components/Committee/Departments"
import ContactUs from "../components/ContactUs"

export default function DepartmentPage(props) {
  let { heading, heads, core } = props
  // console.log(heading)

  console.log(heading.includes("&"))

  if (heading.includes("&")) {
    heading = heading.split("&")
  }

  return (
    <div className="bg-black font-Lato">
      <div className="flex min-h-[80vh] flex-col bg-black">
        <Navbar />
        <div
          className={`
        mt-44 bg-black px-3 sm:mt-72
        ${heading.length === 2 ? "btwnMdAndLg:mt-24" : "btwnMdAndLg:mt-40"}
         btwnMdAndLg:px-12 lg:px-16 xl:px-20`}
        >
          <div className="text-center ">
            <h1 className=" font-Bebas text-[5.5rem] uppercase text-primary sm:text-9xl md:pt-2 btwnMdAndLg:text-[9rem] xl:text-[10rem]">
              {heading.length === 2 ? (
                <>
                  {heading[0]}
                  <br />
                  &
                  <br />
                  {heading[1]}
                </>
              ) : (
                heading
              )}
            </h1>
          </div>
        </div>
      </div>
      <ProfileCard data={heads} heading={"Heads"} />
      {core && core.length > 0 && <ProfileCard data={core} heading={"Core"} />}
      <Departments />

      {/* Footer */}
      <ContactUs />
    </div>
  )
}
