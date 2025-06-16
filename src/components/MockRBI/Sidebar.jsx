import React from "react"
import { Link, useLocation } from "react-router-dom"
// Auth0
import { useAuth0 } from "@auth0/auth0-react"

export const Sidebar = () => {
  const { logout } = useAuth0()
  const location = useLocation()

  const categories = [
    {
      name: "Less Developed",
      url: "lessDeveloped",
    },
    {
      name: "Developed",
      url: "developed",
    },
    {
      name: "Emerging",
      url: "emerging",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-tertiary p-8">
        <div className="w-20">
          <Link to="/">
            <img
              src="/images/logos/logo.webp"
              className="rounded-full"
              alt="Anirveda Logo"
            />
          </Link>
        </div>
        <div className="mt-6">
          {/* <h1 className="text-4xl font-medium text-primary">Categories</h1>

          <div className="mt-8">
            {categories.map((category, index) => {
              return (
                <div key={index} className="mt-5">
                  <Link to={`/mockrbi/play?${category.url}`}>
                    <h2
                      className={`text-2xl text-secondary
                    ${
                      location.search === `?${category.url}`
                        ? "rounded-sm bg-secondary-opacity py-2 pl-6 font-medium"
                        : "font-normal"
                    }
                    `}
                    >
                      {category.name}
                    </h2>
                  </Link>
                </div>
              )
            })}
          </div> */}

          <h3
            className="mt-16 w-fit cursor-pointer rounded-md border-2 border-primary px-4 py-2 text-xl text-primary hover:bg-primary hover:text-tertiary hover:duration-300"
            onClick={() =>
              logout({
                logoutParams: {
                  // returnTo: "https://anirveda-pdeu.vercel.app/mockrbi", // for local testing
                  returnTo: "https://anirvedapdeu.in/mockrbi", // for local testing
                },
              })
            }
          >
            Logout
          </h3>
        </div>
      </div>
    </>
  )
}
