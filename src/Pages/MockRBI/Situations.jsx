import React, {useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom"

// Context
import {useContext} from "react"
import {SituationContext} from "../../Context/SituationProvider"

import Navbar from "../../components/MockRBI/Navbar"
import AllSituations from "../../components/MockRBI/AllSituations"

// This page will have access to only Anirveda
export default function Situations() {
  const location = useLocation()
  const navigate = useNavigate()

  const isAuthenticated = location.state
    ? location.state.isAuthenticated
    : false

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login")
    }
  }, [])

  // Extracting the context
  const {
    state: {isResetButtonClicked, isLoading, isDeleting},
    resetAllSituations,
  } = useContext(SituationContext)

  const handleResetButtonClick = () => {
    resetAllSituations()
  }

  return (
    <div className={`min-h-screen bg-black px-10 py-8 font-Lato`}>
      <Navbar />

      <div className="mt-8 px-5">
        <h1 className="text-center text-4xl font-semibold text-primary">
          Situations
        </h1>

        <h1
          className={`mt-2 text-center text-lg text-secondary ${
            isLoading ? "visible" : "invisible"
          } `}
        >
          Upadating...
        </h1>

        <AllSituations />

        <div className="mt-6 flex justify-center">
          <button
            className={`rounded-md border-[2px] border-transparent bg-tertiary px-3 py-1  text-lg text-secondary 
            
            ${
              isResetButtonClicked
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer opacity-100"
            }
            `}
            onClick={handleResetButtonClick}
            disabled={isResetButtonClicked}
          >
            {isDeleting ? "Resetting..." : "Reset All Situations"}
          </button>
        </div>
      </div>
    </div>
  )
}
