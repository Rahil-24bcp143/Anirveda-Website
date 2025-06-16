import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./LoadingScreen"; 

import HomePage from "./Pages/HomePage";
import Committee from "./Pages/Committee";
import Events from "./Pages/Events";
import Gallery from "./Pages/Gallery";
import DepartmentPage from "./Pages/DepartmentPage";
import Registration from "./Pages/Registration";
import Sponsors from "./Pages/Sponsors";
import Blogs from "./Pages/Blogs";

// Data of all the departments (shortened for clarity)
import emLogisticsHead from "./data/departments/emNlogistics/emLogisticsHead";
import emLogisticsCore from "./data/departments/emNlogistics/emLogisticsCore";
import dmHeads from "./data/departments/dm/dmHeads";
import dmCore from "./data/departments/dm/dmCore";
import prHeads from "./data/departments/pr/prHeads"
import prCore from "./data/departments/pr/prCore"
import cndHeads from "./data/departments/cnd/cndHeads"
import cndCore from "./data/departments/cnd/cndCore"
import techHeads from "./data/departments/tech/techHeads"
import techCore from "./data/departments/tech/techCore"
import veHeads from "./data/departments/ve/veHeads"
import gdHeads from "./data/departments/gd/gdHeads"
import gdCore from "./data/departments/gd/gdCore"
import sponsorshipHeads from "./data/departments/sponsorship/sponsorshipHeads"
import sponsorshipCore from "./data/departments/sponsorship/sponsorshipCore"


import ScrollToTop from "./ScrollToTop";

// Mock RBI
import Home from "./Pages/MockRBI/Home"
import Play from "./Pages/MockRBI/Play"
import Situations from "./Pages/MockRBI/Situations"
import Login from "./Pages/Admin/Login"
import { SituationProvider } from "./Context/SituationProvider";
// import SupplyDemandG from "./Pages/MockRBI/SupplyDemandG"
import CurrentSituation from "./Pages/MockRBI/CurrentSituation"
import Unauthorized from "./Pages/utils/Unauthorized"
import BlogDetails from "./Pages/BlogDetails";
import Cityscapes from "./Pages/CityScapes";
import Economania from "./Pages/Economania";
import Leaderboard from "./Pages/MockRBI/LeaderBoard";
import GalaxEcon from "./Pages/GalaxEcon";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const symbols = ['$', '€', '#', '</>', '¥', '&', '%', '&','💸','🚀','🌟','⚖️','💡','💹']; 
  const heading = "Hey World! This is ANIRVEDA"; //must be changed from LoadingScreen.jsx

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 3000); //time to change after which the loading page ends

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen symbols={symbols} heading={heading} />
      ) : (
        <SituationProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path='/blogs/:id' element={<BlogDetails/>} />
              <Route path="/cityscapes" element={<Cityscapes />} />
              
              <Route path="/economania" element={<Economania/>} />
              <Route
                path="/em-logs"
                element={
                  <DepartmentPage
                    heading="Event Management & Creative"
                    heads={emLogisticsHead}
                    core={emLogisticsCore}
                  />
                }
              />
              <Route
                path="/dm"
                element={
                  <DepartmentPage
                    heading="Digital Marketing"
                    heads={dmHeads}
                    core={dmCore}
                  />
                }
              />
              <Route
              path="/pr"
              element={
                <DepartmentPage
                  heading="Public Relations"
                  heads={prHeads}
                  core={prCore}
                />
              }
            />
            <Route
              path="/cnd"
              element={
                <DepartmentPage
                  heading="Content & Documentation"
                  heads={cndHeads}
                  core={cndCore}
                />
              }
            />
            <Route
              path="/tech"
              element={
                <DepartmentPage
                  heading="Technical"
                  heads={techHeads}
                  core={techCore}
                />
              }
            />
            {/* <Route
              path="/cr"
              element={<DepartmentPage heading="Creative" heads={veHeads} />}
            /> */}
            <Route
              path="/gd"
              element={
                <DepartmentPage
                  heading="Graphics Design & Video Editing"
                  heads={gdHeads}
                  core={gdCore}
                />
              }
            />
            <Route
              path="/sponsorship"
              element={
                <DepartmentPage
                  heading="Sponsorship"
                  heads={sponsorshipHeads}
                  core={sponsorshipCore}
                />
              }
            />
            <Route path="/galaxecon" element={<GalaxEcon />} />
            <Route path="/mockrbi" element={<Home />} />
            <Route path="/mockrbi/play" element={<Play />} />
            {/* <Route path="/mockrbi/supply" element={<SupplyDemandG />} /> */}
            <Route path="/mockrbi/admin/situations" element={<Situations />} />
            <Route path="/mockrbi/situation" element={<CurrentSituation />} />
            <Route path="/mockrbi/leaderboard" element={<Leaderboard/>} />
            <Route
              path="/mockrbi/admin/login"
              element={<Login redirectTo="/mockrbi/situation" />}
              // This will redirect to current situation page, which will be shown on projector if needed
            />
            <Route
              path="/mockrbi/admin/leaderboard"
              element={<Login redirectTo="/mockrbi/leaderboard" />}
              // This will redirect to current situation page, which will be shown on projector if needed
            />
            <Route
              path="/admin/login"
              element={<Login redirectTo="/mockrbi/admin/situations" />}
            />
            {/* Utilty routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </BrowserRouter>
        </SituationProvider>
      )}
    </div>
  );
};

export default App;
