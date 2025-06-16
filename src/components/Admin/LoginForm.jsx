import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

export default function LoginForm({redirectTo}) {
  const navigate = useNavigate()

  // currently hardcoded, but will be fetched from the database later on if needed
  const adminEmail = "anirvedatecheco@gmail.com"
  const adminPassword = "anirveda@123"
  const [loginData, setLoginData] = useState({email: "", password: ""})

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (
      loginData.email === adminEmail &&
      loginData.password === adminPassword
    ) {
      navigate(redirectTo, {
        state: {
          isAuthenticated: true,
        },
      })
    } else {
      alert("Invalid Credentials")
      setLoginData({email: "", password: ""})
    }
  }

  return (
    <div className="flex h-4/5 w-full items-center justify-center">
      <div className="m-4 w-full rounded bg-secondary p-8 shadow-lg md:mx-auto md:max-w-sm">
        <span className="mb-4 block w-full text-2xl font-semibold uppercase">
          Login
        </span>
        <form className="mb-4">
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="mb-1 block text-lg">
              Username or Email
            </label>
            <input
              className="focus:shadow-outline w-full rounded  bg-inputFieldColor p-2 outline-none"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="mb-1 block text-xl">
              Password
            </label>
            <input
              className="focus:shadow-outline w-full rounded bg-inputFieldColor p-2 outline-none"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="rounded bg-black px-4 py-2 text-sm font-semibold uppercase text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
