import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiSend } from "react-icons/fi";

export default function Form(props) {
  const { showStrip, setStripText } = props;

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      formData.email === "" ||
      formData.message === "" ||
      formData.phone === "" ||
      formData.subject === ""
    ) {
      alert("Please fill all the fields");
    } else if (formData.phone.length !== 10) {
      alert("Please enter a valid phone number");
    } else {
      setSubmitting(true);

      emailjs
        .sendForm(
          "service_b1udhff",
          "template_ljeybx6",
          form.current,
          "6TsDXqZKcdkjk8gMS"
        )
        .then(
          () => {
            showStrip();
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
            setSubmitting(false);
          },
          (error) => {
            console.log(error);
            setSubmitting(false);
            setStripText("Something went wrong. Please try again later");
            showStrip();
          }
        );
    }
  };

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
        {/* Form Fields */}
        {[
          ["firstName", "First name"],
          ["lastName", "Last name"],
          ["email", "Email address"],
          ["phone", "Phone number"],
        ].map(([name, label]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-3 lg:flex-col lg:items-start lg:justify-start lg:gap-2"
          >
            <label htmlFor={name} className="text-lg xl:text-[21px]">
              {label}
            </label>
            <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
              <input
                type={name === "email" ? "email" : "text"}
                name={name}
                id={name}
                className="w-full rounded-lg bg-inputFieldColor px-2 py-1 **focus:outline-none focus:border-2 focus:border-[#b69575]**"
                onChange={handleChange}
                value={formData[name]}
              />
            </div>
          </div>
        ))}

        {/* Subject */}
        <div className="flex items-center justify-between gap-3 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="subject" className="text-lg xl:text-[21px]">
            Subject
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <input
              type="text"
              name="subject"
              id="subject"
              className=" w-full rounded-lg bg-inputFieldColor px-2 py-1 **focus:outline-none focus:border-2 focus:border-[#b69575]**"
              onChange={handleChange}
              value={formData.subject}
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex items-center justify-between gap-3 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-2">
          <label htmlFor="message" className="text-lg xl:text-[21px]">
            Message
          </label>
          <div className="mt-1 w-3/5 lg:mt-0 lg:w-full">
            <textarea
              rows={4}
              name="message"
              id="message"
              className=" w-full rounded-lg bg-inputFieldColor px-2 py-1 **focus:outline-none focus:border-2 focus:border-[#b69575]**"
              onChange={handleChange}
              value={formData.message}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex justify-center md:mt-7 lg:justify-start">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 cursor-pointer rounded-lg bg-black px-8 py-2 text-white md:text-xl transition-transform duration-200 hover:bg-[#655341] border border-[#b69575]"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <FiSend className="text-lg" /> Send
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}