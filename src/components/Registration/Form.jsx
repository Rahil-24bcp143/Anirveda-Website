import React, { useState } from "react"
import axios from "axios"
import toast, { Toaster, ToastBar } from "react-hot-toast"

// const API_URL = "http://localhost:3000/api/v1" // Just for local testing
const API_URL = "http://127.0.0.1:5001/api/v1" // Just for local testing
// const API_URL = "https://anirveda-datanomics.onrender.com/api/v1"

export default function Form({ event_name }) {
  //   console.log(event_name)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roll: "",
    branch: "",
    batch: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.roll ||
      !formData.branch ||
      !formData.batch
    ) {
      toast.error("Please fill all the fields")
    } else if (formData.phone.length !== 10) {
      toast.error("Please enter a valid phone number")
    } else {
      setIsSubmitting(true)
      axios
        .post(`${API_URL}/register`, {
          ...formData,
          event: event_name,
        })
        .then((res) => {
          console.log(res.data)
          toast(
            <div>
              <p className="font-bold">✅ Registered Succesfully!</p>
              <br />
              <p>Join our whatsapp group for further updates</p>
              <br />
              <a
                href="https://chat.whatsapp.com/Gw7FEeXo9vpD46xpjyjd2s"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-blue-600"
              >
                Click here
              </a>
            </div>,
            {
              duration: 30000,
              position: "top-center",
              style: {
                borderRadius: "10px",
                background: "white",
                color: "black",
                padding: "16px",
              },
            }
          )
          setFormData({
            name: "",
            email: "",
            phone: "",
            roll: "",
            branch: "",
            batch: "",
            message: "",
          })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Something went wrong! Please try again later.")
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    }
  }

  return (
    <>
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <div className="relative mt-4 overflow-hidden pb-8 lg:px-14 lg:pb-24 xl:px-20">
        <p className="ml-4 text-secondary xs:ml-7 lg:ml-0 xl:ml-7">
          * marked fields are mandatory
        </p>
        <div className="xl:ml-7">
          <form className="mt-4 space-y-2 px-4 text-secondary xs:px-8 md:mt-5 md:space-y-3 md:text-xl lg:grid lg:grid-cols-2 lg:gap-x-7 lg:gap-y-7 lg:space-y-0 lg:px-0">
            <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="name" className="text-lg xl:text-2xl">
                Name <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full ">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className=" w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor px-2 py-1"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="email" className="text-lg xl:text-2xl">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor  px-2 py-1"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="phone" className="text-lg xl:text-2xl">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className=" w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor  px-2 py-1"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="roll" className="text-lg xl:text-2xl">
                Roll Number <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
                <input
                  type="text"
                  name="roll"
                  id="roll"
                  className=" w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor  px-2 py-1"
                  onChange={handleChange}
                  value={formData.roll}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="branch" className="text-lg xl:text-2xl">
                Branch <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
                <input
                  type="text"
                  name="branch"
                  id="branch"
                  className=" w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor  px-2 py-1"
                  onChange={handleChange}
                  value={formData.branch}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="batch" className="text-lg xl:text-2xl">
                Batch <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
                <input
                  type="text"
                  name="batch"
                  id="batch"
                  className="w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor  px-2 py-1 placeholder-secondary-opacity"
                  placeholder="For example: 2023, 2022, 2021"
                  onChange={handleChange}
                  value={formData.batch}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
              <label htmlFor="message" className="text-lg xl:text-2xl">
                Any Queries/Suggestions ?
              </label>
              <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
                <textarea
                  type="text"
                  rows={4}
                  name="message"
                  id="message"
                  className=" w-full rounded-lg border-2 border-secondary-15 bg-inputFieldColor px-2 py-1"
                  onChange={handleChange}
                  value={formData.message}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-center md:mt-7 lg:justify-start">
              <input
                type="submit"
                value={isSubmitting ? "Submitting..." : "Register"}
                className={`cursor-pointer rounded-lg bg-primary px-8 py-1 font-semibold text-black md:text-2xl
                ${isSubmitting ? "opacity-50" : "hover:bg-primary-15"}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
