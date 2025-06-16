import React from "react"
import { Icon } from "@iconify/react"

export default function InfoModal(props) {
  const {
    closeModal,
    impact,
    balance,
    isCorrectAnswer,
  } = props
  // const correspondingImpactValue = dummySituation.impact[indexOfButtonChoice]
  // const correspodingImpactStatus =
  //   dummySituation.impactStatus[indexOfButtonChoice]

  let impactText = `Your balance effected by ${impact}`

  // if (isCorrectAnswer) {
  //   impactText = "Your balance increases by 1000 Rs"
  // } else {
  //   impactText = "Your balance decreases by 1000 Rs"
  // }

  // if (correspodingImpactStatus === "+") {
  //   impactText = `Your balance increases by ${correspondingImpactValue} of your balance`
  // } else if (correspodingImpactStatus === "-") {
  //   impactText = `Your balance reduces by ${correspondingImpactValue} of your balance`
  // }

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
      <div className="mt-6 px-3 pb-6 md:pb-8 xl:pb-11">
        <div className="flex flex-col gap-1 lg:gap-2">
          <h1 className="text-center text-lg font-semibold text-primary sm:text-2xl lg:text-3xl">
            Impact of your Choice
          </h1>

          <p className="text-center text-lg text-secondary sm:text-xl">
            {impactText}
          </p>
        </div>

        <div className="mt-4 px-3 lg:mt-5 xl:mt-7">
          <div className="flex flex-col gap-1">
            <h1 className="text-center text-lg font-semibold text-primary sm:text-2xl lg:text-3xl">
              Your New Balance
            </h1>

            <h2 className="text-center text-lg text-secondary sm:text-xl xl:text-2xl">
              ₹ {balance}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
