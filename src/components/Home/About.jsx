"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export default function About() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-center font-Bebas text-5xl uppercase text-primary sm:text-6xl xl:text-7xl">
              About <br />
              <span className="text-5xl md:text-[6rem] font-bold mt-2 leading-none text-primary block">
                Anirveda
              </span>
            </h1>
          </>
        }
      >
        <div className="flex flex-col md:flex-row gap-6 h-full">
          <div className="md:w-1/2 flex flex-col justify-between space-y-4">
            <div className="space-y-4 p-4">
              <p className="text-justify text-secondary md:text-lg">
                Anirveda is the official TechnoEconomics club of PDEU functional from
                2016. It started as an effort to combine the forces of Economics &
                Technology. They believe that change is the only constant that this
                world holds, and these two dynamic forces are the harbingers of any
                positive change.
              </p>
              <p className="text-justify text-secondary md:text-lg">
                We, at Anirveda, explore the varied aspects of
                technology and economics and its applications and implications in our
                daily lives. Anirveda has always made efforts to simplify economics
                and technology for its audience on social media through Podcasts and
                Posts on different trending topics and current affairs like CBDC,
                Digital Pollution, impact of Drone Ecosystem, OTT platforms and
                Lockdown Effect, Vibrant Gujarat, Arthashastra, Twin Deficit etc.
              </p>
              <p className="text-justify text-secondary md:text-lg">
                Anirveda works with the impetus of enhancing the knowledge and skill
                set of not only the participants but also its committee members.
              </p>
            </div>
            
            <div className="flex justify-start gap-3 p-4">
              <a href="https://www.instagram.com/anirveda_pdeu/" target="_blank" rel="noopener noreferrer">
                <Icon
                  icon="mdi:instagram"
                  color="#b69575"
                  className="cursor-pointer text-3xl hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/anirveda-the-technoeconomics-club/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="mdi:linkedin"
                  color="#b69575"
                  className="cursor-pointer text-3xl hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=anirvedatecheco@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="mdi:email"
                  color="#b69575"
                  className="cursor-pointer text-3xl hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 h-full flex flex-col justify-between gap-4">
            <div className="h-1/2 overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/duygdcgj3/image/upload/v1756360669/Committee_Photo-2_tacomp.jpg"
                alt="group of people"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="h-1/2 overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/duygdcgj3/image/upload/v1756360676/Committee_Photo-1_c4jpdr.jpg"
                alt="group of people"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
