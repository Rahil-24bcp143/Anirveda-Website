import React from "react"
import {Icon} from "@iconify/react"

import Form from "./Home/Form"

export default function ContactUs() {
  const [clicked, setClicked] = React.useState(false)
  const [stripText, setStripText] = React.useState(
    "Form submitted successfully!"
  )

  const showStrip = () => {
    setClicked((prev) => !prev)
  }

  return (
    <div className="relative mt-16 overflow-hidden pb-8 lg:grid lg:grid-cols-contactSection lg:gap-8 lg:px-14 lg:pb-24 xl:px-20">
      <div className="lg:mt-14 xl:ml-7">
        <h1 className="text-center font-Bebas text-5xl uppercase text-primary btwnMdAndLg:text-6xl lg:text-left lg:text-[55px]">
          Contact us
        </h1>
        <p className="text-center font-Abel text-lg text-white sm:text-xl lg:mt-5 lg:text-left lg:text-2xl">
          Fill the form and get in touch with us
        </p>
        <div className="hidden lg:block">
          <div className="relative  mt-12  flex items-center gap-3 pb-5 after:absolute after:left-0 after:bottom-0  after:h-[1px] after:w-full after:bg-[#D9D9D9]  ">
            <a href="https://www.instagram.com/anirveda_pdeu/" target="_blank">
              <Icon
                icon="mdi:instagram"
                color="#C9872B"
                className="cursor-pointer text-3xl"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/anirveda-the-technoeconomics-club/"
              target="_blank"
            >
              <Icon
                icon="mdi:linkedin"
                color="#C9872B"
                className="cursor-pointer text-4xl"
              />
            </a>
            {/* <Icon
              icon="mdi:whatsapp"
              color="#C9872B"
              className="cursor-pointer text-4xl"
            /> */}
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <h1 className="font-Abel text-lg uppercase text-white">
                Location
              </h1>
              <div className="flex items-center">
                <Icon
                  icon="material-symbols:home"
                  color="#c9872b"
                  className="text-2xl"
                />
                <span className="ml-2 font-Abel text-base text-white">
                  Pandit Deendayal Energy University, Gandhinagar, Gujarat
                </span>
              </div>
            </div>

            {/* <div>
              <h1 className="font-Abel text-lg uppercase text-white">Phone</h1>
              <div className="flex items-center">
                <Icon
                  icon="material-symbols:phone-enabled-sharp"
                  rotate="1"
                  color="#c9872b"
                  className="text-2xl"
                />
                <span className="ml-2 font-Abel text-base text-white">
                  +91 1234567890
                </span>
              </div>
            </div> */}
            <div>
              <h1 className="font-Abel text-lg uppercase text-white">
                Support
              </h1>
              <div className="flex items-center">
                <Icon icon="mdi:email" color="#c9872b" className="text-2xl" />
                <span className="ml-2 cursor-pointer font-Abel text-base text-white">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=anirvedatecheco@gmail.com"
                  target={"_blank"}
                  >
                    anirvedatecheco@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <Form showStrip={showStrip} setStripText={setStripText} />

      {/* Strip */}
      <div
        className={`fixed bottom-5 z-10 flex items-center justify-between gap-5 bg-tertiary py-2 px-12 text-center text-xl text-secondary transition-all
      duration-500 ${
        clicked
          ? "left-0  w-full sm:w-[70%] md:w-fit md:translate-x-0"
          : "-left-[150%]"
      }
      `}
      >
        <h1>{stripText}</h1>
        <Icon
          icon="akar-icons:cross"
          color={"#B69575"}
          className="mt-[2px] cursor-pointer text-2xl"
          onClick={showStrip}
        />
      </div>

      {/* Hidden after lg breakpoint */}
      <div className="mt-5 lg:hidden">
        <div className="relative mt-3 flex items-center justify-center gap-3 pb-3 after:absolute after:left-1/2 after:bottom-0  after:h-[2px] after:w-3/4 after:-translate-x-1/2 after:bg-[#D9D9D9]  ">
          <a href="https://www.instagram.com/anirveda_pdeu/" target="_blank">
            <Icon
              icon="mdi:instagram"
              color="#C9872B"
              className="cursor-pointer text-3xl"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/anirveda-the-technoeconomics-club/"
            target="_blank"
          >
            <Icon
              icon="mdi:linkedin"
              color="#C9872B"
              className="cursor-pointer text-4xl"
            />
          </a>
          {/* <Icon
            icon="mdi:whatsapp"
            color="#C9872B"
            className="cursor-pointer text-3xl"
          /> */}
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols:home"
              color="#c9872b"
              className="text-2xl"
            />
            <span className="ml-2 text-center font-Abel text-base text-white">
              Pandit Deendayal Energy University,
              <br /> Gandhinagar, Gujarat
            </span>
          </div>
          {/* <div className="flex items-center justify-center">
            <Icon
              icon="material-symbols:phone-enabled-sharp"
              rotate="1"
              color="#c9872b"
              className="text-2xl"
            />
            <span className="ml-2 font-Abel text-base text-white">
              +91 1234567890
            </span>
          </div> */}
          <div className="flex items-center justify-center">
            <Icon icon="mdi:email" color="#c9872b" className="text-2xl" />
            <span className="ml-2 font-Abel text-base text-white">
              anirvedatecheco@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
