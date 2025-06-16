import React from "react"
import {Link} from "react-router-dom"
import Navbar from "../../components/MockRBI/Navbar"

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-black px-10 py-8">
      <Navbar />

      <div className="mt-20">
        <h1 className="text-center font-Bebas text-7xl uppercase text-primary xs:text-8xl lg:text-9xl">
          401 Unauthorized
        </h1>

        <p className="mx-auto mt-4 w-3/5 text-center text-4xl font-medium leading-relaxed text-secondary">
          You are not authorized to access this page. Please
          {
            <Link to="/mockrbi/admin/login">
              <span className="mx-2 cursor-pointer border-b-[2px] border-secondary">
                Login
              </span>
            </Link>
          }
          to continue.
        </p>
      </div>
    </div>
  )
}
