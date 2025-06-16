import React, {useRef, useState} from "react"
import emailjs from "@emailjs/browser"

export default function Form(props) {
  const {showStrip, setStripText} = props

  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    // Form validation
    if (
      formData.email === "" ||
      formData.message === "" ||
      formData.phone === "" ||
      formData.subject === ""
    ) {
      alert("Please fill all the fields")
    } else if (formData.phone.length != 10) {
      alert("Please enter a valid phone number")
    } else {
      // console.log(formData)

      setSubmitting(true)
      // Send form data to email
      // emailjs
      //   .sendForm(
      //     "service_0snfcfj",
      //     "template_w1dksr9",
      //     form.current,
      //     "e3UnHOO6CAQpz_XOL"
      //   )
      emailjs
          .sendForm(
            "service_b1udhff",
            "template_ljeybx6",
            form.current,
            "6TsDXqZKcdkjk8gMS"
          )
        .then(
          (result) => {
            // console.log(result)
            showStrip()
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            })
            setSubmitting(false)
          },
          (error) => {
            console.log(error)
            setSubmitting(false)
            setStripText("Something went wrong. Please try again later")
            showStrip()
          }
        )
    }
  }

  return (
    <div
      className="mx-auto mt-3 w-[90%] bg-secondary py-5 sm:w-3/4 sm:py-6 md:px-9 btwnMdAndLg:w-3/5 lg:w-full lg:py-14 xl:w-[90%] xl:px-[70px] xl:py-16 btwnXlAnd2xl:w-[85%] btwnXlAnd2xl:py-20 rounded-lg"
      id="contact"
    >
      <h1 className="relative pb-1 text-center text-xl font-bold after:absolute after:bottom-0 after:left-0 after:mx-4 after:h-[2px] after:w-[90%] after:bg-black sm:text-2xl md:pb-2 lg:text-left lg:after:mx-0 lg:after:h-[1px] lg:after:w-full xl:text-3xl">
        Let's Connect
      </h1>
      <form
        className="mt-4 space-y-2 px-4 xs:px-8 md:mt-7 md:space-y-3 md:text-xl lg:grid lg:grid-cols-2 lg:gap-x-7 lg:gap-y-5 lg:space-y-0 lg:px-0"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="firstName" className="text-lg xl:text-[21px]">
            First name
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full ">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className=" w-full rounded-lg bg-inputFieldColor px-2 py-1"
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="lastName" className="text-lg xl:text-[21px]">
            Last name
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full rounded-lg bg-inputFieldColor px-2 py-1"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="email" className="text-lg xl:text-[21px]">
            Email address
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="w-full rounded-lg bg-inputFieldColor px-2 py-1 "
              value={formData.email}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="phone" className="text-lg xl:text-[21px]">
            Phone number
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={handleChange}
              className=" w-full rounded-lg bg-inputFieldColor px-2 py-1"
              value={formData.phone}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="subject" className="text-lg xl:text-[21px]">
            Subject
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <input
              type="text"
              name="subject"
              id="subject"
              className=" w-full rounded-lg border-none bg-inputFieldColor px-2 py-1"
              onChange={handleChange}
              value={formData.subject}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="message" className="text-lg xl:text-[21px]">
            Message
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <textarea
              type="text"
              rows={4}
              name="message"
              id="message"
              className=" w-full rounded-lg bg-inputFieldColor px-2 py-1"
              onChange={handleChange}
              value={formData.message}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center md:mt-7 lg:justify-start">
          <input
            type="submit"
            value={submitting ? "Submitting..." : "Send"}
            className="cursor-pointer rounded-lg bg-black px-8 py-1 text-white md:text-xl"
          />
        </div>
      </form>
    </div>
  )
}
