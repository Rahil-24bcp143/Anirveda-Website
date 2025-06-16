import React from "react"
import {Icon} from "@iconify/react"

export default function isAlertModal(props) {
  const {closeModal} = props
  return (
    <div className="bg-tertiary font-Lato">
      <div className="flex justify-end pr-4 pt-4 md:pr-6 md:pt-6">
        <Icon
          icon="akar-icons:cross"
          color={"#B69575"}
          className="cursor-pointer text-xl md:text-2xl xl:text-3xl"
          onClick={closeModal}
        />
      </div>
      <div className="mt-6 px-5 pb-6 md:pb-8 xl:pb-11">
        <h1 className="text-center text-lg font-semibold text-primary sm:text-2xl lg:text-3xl">
          Please wait for the instructions before clicking on Get Situation.
        </h1>
        <h1 className="mt-4 text-center text-lg text-secondary sm:text-xl lg:text-2xl">
          Don't click on Get Situation multiple times.
        </h1>
      </div>
    </div>
  )
}
