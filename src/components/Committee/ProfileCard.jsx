import React, { useEffect } from "react"
import { Icon } from "@iconify/react"

export default function ProfileCard(props) {
  const { data, heading } = props

  let [current, setCurrent] = React.useState(0)

  const dataList = data.map((item) => (
    <div
      key={item.id}
      className="w-full max-w-xs rounded-3xl bg-gray-800 shadow-lg p-6 font-Abel transition-transform duration-300 hover:scale-105 hover:shadow-xl xs:w-4/5 sm:w-3/5 md:w-1/4 md:px-8 flex flex-col items-center justify-between"
    >
      <div className="relative mb-6">
        <div className="mx-auto h-36 w-36 rounded-full border-4 border-white overflow-hidden">
          <img
            src={item.img_src}
            className="h-full w-full object-cover object-center"
            alt={item.name}
          />
        </div>
        <div className="absolute top-0 right-0 p-2">
          <a href={item.linkedIn} target="_blank" rel="noopener noreferrer">
            <Icon
              icon="mdi:linkedin"
              className="text-3xl text-primary hover:text-secondary transition duration-200"
            />
          </a>
        </div>
      </div>
      <h2 className="text-center text-3xl font-bold text-white">{item.name}</h2>
      <h3 className="mt-2 text-center text-2xl text-gray-400">{item.position}</h3>
      <div className="w-full mt-6">
        <a href={item.linkedIn} target="_blank" rel="noopener noreferrer">
          <button className="w-full rounded-full bg-primary py-2 text-lg font-bold text-white hover:bg-secondary transition duration-200">
            Contact
          </button>
        </a>
      </div>
    </div>
  ))

  return (
    <div>
      <h1 className="bg-black py-20 text-center font-Bebas text-[5rem] text-8xl font-light uppercase text-primary">
        {heading}
      </h1>
      <div className="relative mt-8 flex items-center justify-between gap-4 xs:px-6 sm:p-10 md:mt-0 md:justify-center md:px-5 lg:px-8">
        <div className="ml-3 md:hidden">
          <Icon
            icon="ic:baseline-chevron-left"
            className="cursor-pointer rounded-full bg-secondary p-1 text-4xl text-gray-700 hover:text-primary transition duration-300"
            onClick={() => {
              if (current === 0) {
                setCurrent(dataList.length - 1)
              } else {
                setCurrent(current - 1)
              }
            }}
          />
        </div>
        {/* All Profile Cards */}
        <div className="relative flex w-full justify-center md:hidden">
          {dataList[current]}
        </div>
        <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-8 lg:mx-auto lg:w-[90%] lg:gap-10">
          {dataList}
        </div>
        <div className="mr-3 md:hidden">
          <Icon
            icon="ic:baseline-chevron-right"
            className="cursor-pointer rounded-full bg-secondary p-1 text-4xl text-gray-700 hover:text-primary transition duration-300"
            onClick={() => {
              if (current === dataList.length - 1) {
                setCurrent(0)
              } else {
                setCurrent(current + 1)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}