import React from "react"
import { Icon } from "@iconify/react"

export default function About() {
  return (
    <div className="mt-4 px-4 lg:relative lg:px-8 xl:mt-16 xl:px-24">
      <div className="md:mx-auto md:w-4/5 lg:absolute lg:right-0 lg:top-[28%] lg:w-[40%] lg:-translate-y-1/2 xl:right-16 xl:w-[30%] btwnXlAnd2xl:right-28">
        <img
          src="./images/gallery/1.webp"
          alt="group of people"
          className="mx-auto sm:w-full   xl:mx-0 rounded-xl"
        />
      </div>
      <div className="hidden md:w-4/5 lg:absolute lg:right-0 lg:bottom-0 lg:block lg:w-[40%] lg:-translate-y-1/2 xl:bottom-[-15%] xl:right-16 xl:w-[30%] btwnXlAnd2xl:right-28">
        <img
          src="./images/gallery/15.webp"
          alt="group of people"
          className="mx-auto sm:w-full  xl:mx-0 rounded-xl"
        />
      </div>
      <div className="mt-3  bg-tertiary py-5 md:mx-auto md:w-4/5 md:py-8 lg:mx-0 lg:w-4/5 lg:rounded-2xl lg:px-8 lg:py-12 xl:w-[90%] xl:px-12 xl:py-14 btwnXlAnd2xl:w-4/5 btwnXlAnd2xl:px-20">
        <h1 className="text-center font-Bebas text-5xl uppercase text-primary sm:text-6xl lg:text-left xl:text-7xl">
          About anirveda
        </h1>
        {/* <h2 className="text-center text-lg text-secondary sm:text-xl lg:my-2 lg:text-left">
          Single line here
        </h2> */}
        <p className="mx-auto mt-1 w-4/5 text-justify text-secondary md:text-lg lg:mx-0 lg:mt-8 lg:w-1/2">
          Anirveda is the official TechnoEconomics club of PDEU functional from
          2016. It started as an effort to combine the forces of Economics &
          Technology. They believe that change is the only constant that this
          world holds, and these two dynamic forces are the harbingers of any
          positive change. We, at Anirveda, explore the varied aspects of
          technology and economics and its applications and implications in our
          daily lives. Anirveda has always made efforts to simplify economics
          and technology for its audience on social media through Podcasts and
          Posts on different trending topics and current affairs like CBDC,
          Digital Pollution, impact of Drone Ecosystem, OTT platforms and
          Lockdown Effect, Vibrant Gujarat, Arthashastra, Twin Deficit etc.
        </p>
        {/* <p className="mx-auto mt-1 w-4/5 text-justify text-secondary md:text-lg lg:mx-0 lg:mt-4 lg:w-1/2">
          We have been putting up 'Word of the week' and Book recommendations on
          a weekly basis on our Instagram stories. From flagship events like
          Globalopoly and Ambush Marketing to one of our most successful events
          - IPL Auction, we believe in exploring and expanding the horizon of
          the two tools - economics and technology to sail through this dynamic
          world. Our events regularly witness massive participation of upto 150+
          students and we have also conducted several successful collaborative
          events.
        </p> */}
        <p className="mx-auto mt-1 w-4/5 text-justify text-secondary md:text-lg lg:mx-0 lg:mt-4 lg:w-1/2">
          Anirveda works with the impetus of enhancing the knowledge and skill
          set of not only the participants but also its committee members.
        </p>

        <div className="mt-3 flex justify-center gap-3 md:mt-5 lg:justify-start">
          <a href="https://www.instagram.com/anirveda_pdeu/" target="_blank">
            <Icon
              icon="mdi:instagram"
              color="#b69575"
              className="cursor-pointer text-3xl"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/anirveda-the-technoeconomics-club/"
            target="_blank"
          >
            <Icon
              icon="mdi:linkedin"
              color="#b69575"
              className="cursor-pointer text-3xl"
            />
          </a>
          {/* <Icon
            icon="mdi:whatsapp"
            color="#b69575"
            className="cursor-pointer text-3xl"
          /> */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=anirvedatecheco@gmail.com"
            target="_blank"
          >
            <Icon
              icon="mdi:email"
              color="#b69575"
              className="cursor-pointer text-3xl"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
