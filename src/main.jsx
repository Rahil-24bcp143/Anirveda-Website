import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// Auth0 Provider
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bdbgjqlrb6d34br3.us.auth0.com"
      clientId="oyPrZhjrVHZ8ChEoAEgOYx16twoOBohE"
      authorizationParams={{
        // redirect_uri: "https://anirveda-pdeu.vercel.app/mockrbi/play", // for local testing
        redirect_uri: "https://anirvedapdeu.in/mockrbi/play", // for local testing
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
