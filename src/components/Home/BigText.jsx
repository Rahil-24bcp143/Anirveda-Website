import React, {useState, useEffect, useRef} from "react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/all"

gsap.registerPlugin(ScrollTrigger)
import "../../style.css"

export default function BigText() {

  function getWindowDimensions() {
    const {innerWidth: width} = window
    return {
      width,
    }
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [windowDimensions])

  const textRef = useRef()

  let translateX
  if (windowDimensions.width > 1300 ) {
    translateX = 0
  } else {
    translateX= -250
  }

  useEffect(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current, //start the animation when "text" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 60%",
        end: "bottom 65%",
      },
      x: translateX,
    })
  }, [])

  return (
    <div className="overflow-hidden text-secondary-15 ">
      <h1
        ref={textRef}
        className="bigText translate-x-[30vw] whitespace-nowrap px-12 font-Yeseva sm:translate-x-[40vw] btwnMdAndLg:translate-x-[45vw] btwnMdAndLg:leading-[18rem] xl:leading-[15rem] text-center"
      >
        Anirveda
      </h1>
    </div>
  )
}
