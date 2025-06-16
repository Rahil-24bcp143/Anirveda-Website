import React from "react"
import GridImage from "./GridImage"
import galleryImages from "../../data/galleryImages"

export default function IfNotAnimation() {
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

  const rows = {}
  allImages.map((rowImage) => {
    let row = rowImage.props.row
    if (!rows[row]) {
      rows[row] = []
    }
    rows[row].push(<div key={rowImage.props.key}>{rowImage}</div>)
  })

  const rowsJSX = Object.keys(rows).map((row, index) => {
    return (
      <div
        key={index}
        className={`mt-[31px] ${
          index === Object.keys(rows).length - 1 ? "pb-[64px]" : ""
        }`}
      >
        <div className=" flex gap-x-11">{rows[row]}</div>
      </div>
    )
  })

  return <div className="overflow-hidden sm:overflow-hidden">{rowsJSX}</div>
}
