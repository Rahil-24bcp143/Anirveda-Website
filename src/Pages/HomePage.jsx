
import Navbar from "../components/Navbar"
import Main from "../components/Home/Main"
import BigText from "../components/Home/BigText"
import About from "../components/Home/About"
import ContactUs from "../components/ContactUs"
import Testimonial from "../components/Home/Testimonial"

import StaggeredDropDown from "../components/Home/staggereddropdown";


const HomePage = () => { 

  return (
    <div className="bg-black font-Lato">
      <div className="h-[80vh]flex flex-col">
        <Navbar />
        <Main />
      </div>
      <BigText />
      <About />
      <StaggeredDropDown/>

      <Testimonial/>
      <ContactUs />
    </div>
  )
}

export default HomePage
