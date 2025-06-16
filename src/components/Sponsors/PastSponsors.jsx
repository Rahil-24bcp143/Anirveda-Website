import React from "react";
import SponsorsCards from "./SponsorsCards";

const PastSponsors = ()=>{
    return (
        <div className="container mx-auto px-5 pb-12 " id="pastsponsors">
                <div className="mb-20 flex w-full flex-wrap">
                  <div className="mb-6 w-full lg:mb-0 lg:w-1/2 2xl:pl-4">
                    <h1 className="mb-2 font-Bebas text-4xl font-medium text-primary sm:text-5xl ">
                      Our Past Sponsors
                    </h1>
                    <div className="h-1 w-20 rounded bg-primary"></div>
                  </div>
                </div>
                <SponsorsCards />
              </div>
    )
}

export default PastSponsors;