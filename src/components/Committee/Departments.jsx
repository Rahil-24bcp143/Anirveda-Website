import { React } from "react"
import { Link } from "react-router-dom"

export default function Departments() {
  const departments = [
    {
      id: 2,
      link: "/em-logs",
      name: "Event Management & Creative",
    },
    {
      id: 3,
      link: "/dm",
      name: "Digital Marketing",
    },
    {
      id: 4,
      link: "/pr",
      name: "Public Relations",
    },
    {
      id: 5,
      link: "/cnd",
      name: "Content & Documentation",
    },
    {
      id: 6,
      link: "/tech",
      name: "Technical",
    },
    {
      id: 8,
      link: "/gd",
      name: "Graphics Design & Video Editing",
    },
    {
      id: 9,
      link: "/sponsorship",
      name: "Sponsorship",
    },
  ]

  const total = departments.length
  const columns = 3

  const departmentsList = departments.map((department, index) => {
    const isLast = index === total - 1
    const isAloneInLastRow = total % columns === 1 && isLast

    return (
      <div
        key={department.id}
        className={`${
          isAloneInLastRow ? "md:col-start-2" : ""
        }`}
      >
        <Link to={department.link}>
          <div className="cursor-pointer rounded-3xl bg-gray-600 p-6 text-center hover:scale-110 hover:bg-primary hover:duration-700 lg:p-12">
            {department.name}
          </div>
        </Link>
      </div>
    )
  })

  return (
    <div className="">
      <h1 className="mt-28 text-center font-Bebas text-[4.5rem] text-8xl font-light uppercase text-primary lg:text-[5rem]">
        Departments
      </h1>
      <div className="mt-3 grid w-full grid-cols-1 gap-2 p-3 font-Abel text-lg font-extrabold text-black opacity-95 duration-300 sm:grid-cols-2 sm:px-5 md:mt-10 md:grid-cols-3 lg:gap-5 lg:text-xl">
        {departmentsList}
      </div>
    </div>
  )
}
