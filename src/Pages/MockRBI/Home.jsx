import React from "react"
import {Link} from "react-router-dom"

import Navbar from "../../components/MockRBI/Navbar"

// Auth0
import {useAuth0} from "@auth0/auth0-react"

export default function Home() {
  // const windowSize = useRef(window.innerHeight)
  // const reducedHeight = windowSize.current - 113
  // console.log(reducedHeight);
  // const height = `h-[${reducedHeight}px]`

  const {loginWithRedirect} = useAuth0()

  return (
    <div className="min-h-screen bg-black px-10 py-8">
      <Navbar />

      <div className={`mt-56 flex flex-col items-center md:mt-44`}>
        <h1 className="font-Bebas text-7xl uppercase text-primary xs:text-8xl lg:text-9xl">
          mock rbi
        </h1>
        <button
          className="mt-4 rounded-md border-[2px] border-secondary px-6 pt-1 pb-2 text-xl text-secondary transition-colors duration-300 hover:bg-secondary hover:text-white"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      </div>
    </div>
  )
}
