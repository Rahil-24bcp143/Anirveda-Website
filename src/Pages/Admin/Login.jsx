import React from "react"

import Navbar from "../../components/MockRBI/Navbar"
import LoginForm from "../../components/Admin/LoginForm"

export default function Login({redirectTo}) {
  return (
    <div className="min-h-screen bg-black px-10 py-8 font-Lato">
      <Navbar />

      {/* Login Form */}
      <LoginForm redirectTo={redirectTo} />
    </div>
  )
}
