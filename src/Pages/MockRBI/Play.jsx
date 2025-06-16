import React, { useState, useEffect } from "react"

import Navbar from "../../components/MockRBI/Navbar"
import PlayMain from "../../components/MockRBI/PlayMain"
import { Sidebar } from "../../components/MockRBI/Sidebar"
import { useLocation, useNavigate } from "react-router-dom"

// Using Context
// import {useContext} from "react"
// import {SituationContext} from "../../Context/SituationProvider"

export default function Play() {
  // De-structuring the state right here
  // This syntax is for nested destructuring
  // ! This is not working as planned. That's why Now I have created the server.
  // const {
  //   state: {clickedSituation},
  // } = useContext(SituationContext)

  // console.log(clickedSituation)

  const location = useLocation()
  console.log(location)
  const navigate = useNavigate()

  return (
    <div className="grid min-h-screen grid-cols-mockrbiSidebar bg-black">
      {/* <Navbar /> */}

      <Sidebar />

      {/* {location.pathname === "/mockrbi/play" && !location.search && (
        <div className="flex items-center justify-center">
          <h1 className="text-4xl text-secondary">
            Please select a category to start playing!
          </h1>
        </div>
      )} */}

      <PlayMain />
    </div>
  )
}
