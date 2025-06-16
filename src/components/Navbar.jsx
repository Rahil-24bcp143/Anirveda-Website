import React from "react"

import HamburgerNav from "./HamburgerNav"
import Nav from "./Nav"

export default function Navbar() {
  return (
    <div className="pt-3 lg:pt-6">
      <div className="sm:hidden">
        <HamburgerNav />
      </div>
      <div className="hidden sm:block">
        <Nav />
      </div>
    </div>
  )
}
