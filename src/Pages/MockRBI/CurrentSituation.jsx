import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

import Navbar from "../../components/MockRBI/Navbar"

// This page will be used to show the current situation on the projector. Hence it will be protected because it is for showing only. We don't want anyone to change the situation. Only the admin can change the situation.
export default function CurrentSituation() {
  const location = useLocation()
  const navigate = useNavigate()

  const isAuthenticated = location.state
    ? location.state.isAuthenticated
    : false

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/unauthorized")
    }
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState({
    situation: "Please click the button to get the current situation.",
  })

  // This is for local development only. Comment this line when deploying to production.
  // const BASE_URL = "http://localhost:3000/api/v1/situation"
  const BASE_URL = "https://mock-rbi-server.vercel.app/api/v1/situation/"

  const getNewSituation = () => {
    // console.log("clicked")
    setIsLoading(true)
    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res)
        setFetchedData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-black px-10 py-8">
      <Navbar />

      <div className="mt-10">
        <h1 className="text-center font-Bebas text-7xl uppercase text-primary xs:text-8xl lg:text-9xl">
          Current Situation
        </h1>

        <p className="mt-4 text-center text-xl font-medium leading-relaxed text-secondary lg:px-16 lg:text-3xl lg:leading-relaxed xl:text-4xl xl:leading-[1.7]">
          {isLoading ? "Loading..." : fetchedData.situation}
        </p>

        <div className="mt-10 flex justify-center">
          <button
            className={`rounded-md border-[2px] border-transparent bg-tertiary px-3 py-1  text-2xl text-secondary hover:text-primary`}
            onClick={getNewSituation}
          >
            Get New Situation
          </button>
        </div>
      </div>
    </div>
  )
}
