import React, {useState} from "react"
import {Icon} from "@iconify/react"
import {Link} from "react-router-dom"

export default function HamburgerNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMoreClicked, setIsMoreClicked] = useState(false)

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen)
  }

  const handleMoreClick = () => {
    setIsMoreClicked(!isMoreClicked)
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5">
        <div>
          <Link to="/">
            <img
              src="./images/logos/logo.webp"
              alt="Anirveda Logo"
              className="w-1/4"
            />
          </Link>
        </div>
        <div className="cursor-pointer">
          <Icon
            icon="charm:menu-hamburger"
            color={"#B69575"}
            className="text-4xl"
            onClick={handleHamburgerClick}
          />
        </div>
      </div>

      {/* Hamburger bar items */}
      <div
        className={`absolute top-0 z-10 h-full w-full bg-secondary-opacity px-5 pt-3 font-Lato text-secondary transition-transform duration-300 ease-in  ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } `}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div>
            <img
              src="./images/logos/logo_white.webp"
              alt="Anirveda Logo"
              className="w-1/4"
            />
          </div>
          <div className="cursor-pointer">
            <Icon
              icon="akar-icons:cross"
              color={"#B69575"}
              className="text-4xl"
              onClick={handleHamburgerClick}
            />
          </div>
        </div>

        <div className="mt-4 text-center text-2xl">
          <Link to="/">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Home
            </h1>
          </Link>
          <Link to="/economania">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Economania
            </h1>
          </Link>
          {/* <h1 className="cursor-pointer">About</h1> */}
          <Link to="/events">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Events
            </h1>
          </Link>
          <Link to="/gallery">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Gallery
            </h1>
          </Link>
          <Link to="/committee">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Committee
            </h1>
          </Link>
          <Link to="/sponsors">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Sponsors
            </h1>
          </Link>
          <Link to="/blogs">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Blogs
            </h1>
          </Link>
          {/* <Link to="/cityscapes">
          <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Cityscapes
            </h1>
          </Link> */}
          <a href="#contact">
            <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
              Contact
            </h1>
          </a>
          <div
            className="flex cursor-pointer items-center justify-center gap-1 hover:text-primary"
            onClick={handleMoreClick}
          >
            <h1 className="mt-3  uppercase ">More</h1>

            {isMoreClicked ? (
              <Icon
                icon="carbon:chevron-up"
                color="#B69575"
                className="mt-3 text-3xl"
              />
            ) : (
              <Icon
                icon="carbon:chevron-down"
                color="#B69575"
                className="mt-3 text-3xl"
              />
            )}
          </div>
          {isMoreClicked && (
            <div>
              <Link to={"/mockrbi"}>
                <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
                  mockrbi
                </h1>
              </Link>
              <Link to={"/galaxecon"}>
                <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
                  galaxecon
                </h1>
              </Link>
              {/* <Link to={"/cityscapes"}>
                <h1 className="mt-3 cursor-pointer uppercase hover:text-primary">
                  cityscapes
                </h1>
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
