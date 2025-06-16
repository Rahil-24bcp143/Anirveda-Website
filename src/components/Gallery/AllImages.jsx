import React, { useEffect, useRef, useState } from "react"
import GridImage from "./GridImage"
import galleryImages from "../../data/galleryImages"
import ContactUs from "../ContactUs"

// For Animation
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)
export default function AllImages() {
  // console.log("Rendering AllImages");
  const allImages = galleryImages.map((image) => {
    return (
      <GridImage
        key={image.id}
        row={image.row}
        src={image.src}
        alt={image.alt}
      />
    )
  })

  let row1Images = []
  let row2Images = []
  let row3Images = []
  let row4Images = []
  let row5Images = []
  let row6Images = []
  allImages.map((rowImage) => {
    if (rowImage.props.row === 1) {
      return row1Images.push(rowImage)
    } else if (rowImage.props.row === 2) {
      return row2Images.push(rowImage)
    } else if (rowImage.props.row === 3) {
      return row3Images.push(rowImage)
    } else if (rowImage.props.row === 4) {
      return row4Images.push(rowImage)
    } else if (rowImage.props.row === 5) {
      return row5Images.push(rowImage)
    } else if (rowImage.props.row === 6) {
      return row6Images.push(rowImage)
    }
  })

  const row1 = useRef()
  const row2 = useRef()
  const row3 = useRef()
  const row4 = useRef()
  const row5 = useRef()
  const row6 = useRef()

  // const [imagesLoaded, setImagesLoaded] = useState(false)

  // useEffect(() => {
  //   const imageLoadPromises = allImages.map((image) => {
  //     return new Promise((resolve, reject) => {
  //       const img = new Image()
  //       img.src = `./images/gallery/${image.props.src}.webp`
  //       img.addEventListener("load", resolve)
  //       img.addEventListener("error", reject)
  //     })
  //   })
  //   Promise.all(imageLoadPromises)
  //     .then(() => {
  //       setImagesLoaded(true)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  useEffect(() => {
    gsap.to(row1.current, {
      scrollTrigger: {
        trigger: row1.current, //start the animation when "row1" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 22%",
        // end: "bottom 10%",
      },
      x: 280,
    })
  })
  useEffect(() => {
    gsap.to(row2.current, {
      scrollTrigger: {
        trigger: row2.current, //start the animation when "row1" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 60%",
        // end: "bottom 10%",
      },
      x: -250,
    })
  })
  useEffect(() => {
    gsap.to(row3.current, {
      scrollTrigger: {
        trigger: row3.current, //start the animation when "row3" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 90%",
        // end: "bottom 10%",
      },
      x: 280,
    })
  })
  useEffect(() => {
    gsap.to(row4.current, {
      scrollTrigger: {
        trigger: row4.current, //start the animation when "row3" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 90%",
        // end: "bottom 10%",
      },
      x: -280,
    })
  })
  useEffect(() => {
    gsap.to(row5.current, {
      scrollTrigger: {
        trigger: row5.current, //start the animation when "row3" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 95%",
        // end: "bottom 10%",
      },
      x: 280,
    })
  })
  useEffect(() => {
    gsap.to(row6.current, {
      scrollTrigger: {
        trigger: row6.current, //start the animation when "row3" enters the viewport
        scrub: 0.5,
        // markers: true, //This is for developers only
        start: "top 98%",
        // end: "bottom 10%",
      },
      x: -280,
    })
  })

  return (
    <div className="overflow-hidden sm:overflow-hidden">
      {/* {!imagesLoaded && (
        <div className="flex h-[80vh] items-center justify-center text-primary text-5xl">
          <p>Loading images...</p>
        </div>
      )} */}
      <>
        {/* ROW 1 */}
        <div className="pt-[64px] ">
          <div className="ml-[-200px] flex gap-x-6 " ref={row1}>
            {row1Images}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="mt-[31px]">
          <div className=" flex gap-x-11" ref={row2}>
            {row2Images}
          </div>
        </div>

        {/* ROW 3 */}
        <div className="mt-[31px]">
          <div className=" ml-[-200px] flex gap-x-11" ref={row3}>
            {row3Images}
          </div>
        </div>
        {/* ROW 4 */}
        <div className="mt-[31px]">
          <div className=" ml-[-200px] flex gap-x-11" ref={row4}>
            {row4Images}
          </div>
        </div>
        {/* ROW 5 */}
        <div className="mt-[31px] pb-[64px]">
          <div className=" ml-[-200px] flex gap-x-11" ref={row5}>
            {row5Images}
          </div>
        </div>
        {/* ROW 6 */}
      <div className="mt-[31px] pb-[64px]">
          <div className=" ml-[-200px] flex gap-x-11" ref={row6}>
            {row6Images}
          </div>
        </div>
      </>

      {/* Footer */}
      <ContactUs />
    </div>
  )
}
