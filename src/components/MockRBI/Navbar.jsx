import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

// Auth0
import { useAuth0 } from "@auth0/auth0-react"

export default function Navbar() {
  // Getting user email id of authenticated user
  const { user, isLoading, isAuthenticated } = useAuth0()
  // console.log(isLoading + " " + isAuthenticated);

  // Logout
  const { logout } = useAuth0()

  const location = useLocation()
  const navigate = useNavigate()
  const [currentPath, setCurrentPath] = useState(location.pathname)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setCurrentPath(location.pathname)
    if (currentPath === "/mockrbi/play") {
      setVisible(true)
      // Commented out temporarily for testing
      // if (isLoading===false && isAuthenticated===false) {
      //   navigate("/mockrbi")
      // }
    } else {
      setVisible(false)
    }
  }, [currentPath, isLoading])

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-20">
          <Link to="/">
            <img src="/images/logos/logo.webp" alt="Anirveda Logo" />
          </Link>
        </div>
        {visible && (
          <div className="text-right">
            {isLoading ? (
              <h2 className="text-lg text-secondary">Loading...</h2>
            ) : (
              <h2 className="text-lg text-secondary">
                {isAuthenticated && user.email}
              </h2>
            )}

            <h3
              className="mt-2 cursor-pointer text-primary"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: "http://localhost:5173/mockrbi", // for local testing
                    // returnTo: "https://anirveda.osailpdeu.in/mockrbi", // for local testing
                  },
                })
              }
            >
              Logout
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}
