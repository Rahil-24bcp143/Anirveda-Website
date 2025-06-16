import React, {useState} from "react"
import {Link, useLocation} from "react-router-dom"
import {Icon} from "@iconify/react"

export default function Nav() {
  const location = useLocation()
  // console.log(location.pathname);

  const [isMoreClicked, setIsMoreClicked] = useState(false)

  const handleMoreClicked = () => {
    setIsMoreClicked(!isMoreClicked)
  }

  return (
    <div className="flex items-center justify-between px-5 md:px-10 lg:px-16">
      <div className="w-20 xl:w-24">
        <Link to="/">
          <img src="/images/logos/logo_white.webp" alt="Anirveda Logo" />
        </Link>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-secondary-opacity px-5 py-1 uppercase text-secondary md:gap-5 md:px-10 lg:px-12 lg:py-2 lg:text-lg xl:gap-7">
        {[
          {
            id: 0,
            title: "home",
            url: "/",
          },
          {
            id: 1,
            title: "economania",
            url: "/economania",
          },
          {
            id: 2,
            title: "events",
            url: "/events",
          },
          {
            id: 3,
            title: "gallery",
            url: "/gallery",
          },
          {
            id: 4,
            title: "committee",
            url: "/committee",
          },
          {
            id: 5,
            title: "sponsors",
            url: "/sponsors",
          },
          {
            id: 6,
            title: "blogs",
            url: "/blogs",
          },
          // {
          //   id: 5,
          //   title: "cityscapes",
          //   url: "/cityscapes",
          // },
          {
            id: 6,
            title: "more",
          },
        ].map(({id, title, url}) => {
          if (title === "more") {
            return (
              <div key={id} className="relative">
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={handleMoreClicked}
                >
                  <h1>{title}</h1>

                  {isMoreClicked ? (
                    <Icon
                      icon="carbon:chevron-up"
                      color="#B69575"
                      className="text-2xl"
                    />
                  ) : (
                    <Icon
                      icon="carbon:chevron-down"
                      color="#B69575"
                      className="text-2xl"
                    />
                  )}
                </div>

                {isMoreClicked && (
                  <div
                    key={id}
                    className="absolute -left-8 top-8 w-fit bg-secondary-opacity p-3 text-secondary"
                  >
                    <Link to="/mockrbi">
                      <h1>Mock RBI</h1>
                    </Link>
                    <Link to="/galaxecon">
                      <h1>GalaxEcon</h1>
                    </Link>
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link to={url} key={id}>
              <h1
                className={`relative cursor-pointer overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[1.8px] after:w-full after:translate-x-[-100%] after:bg-secondary hover:after:duration-300 
            ${
              location.pathname === url ||
              ([
                "/em",
                "/logs",
                "/sm",
                "/publicity",
                "/cnd",
                "/tech",
                "/ve",
                "/gd",
                "/sponsorship",
              ].includes(location.pathname) &&
                url === "/committee")
                ? "font-bold after:translate-x-0"
                : "after:bg-secondary hover:after:translate-x-0 hover:after:transition-transform"
            }`}
              >
                {title}
              </h1>
            </Link>
          )
        })}
      </div>
      <div>
        <a href="#contact">
          <button className=" rounded-lg border-[2px] border-primary px-3 py-1 text-lg uppercase text-primary hover:border-secondary hover:bg-secondary-opacity hover:text-secondary ">
            Contact
          </button>
        </a>
      </div>
    </div>
  )
}
