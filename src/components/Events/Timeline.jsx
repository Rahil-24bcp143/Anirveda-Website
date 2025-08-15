// import React, { useEffect, useState } from "react";

// const calculateProgress = (events) => {
//   const currentDate = new Date();

//   const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

//   let lastPastEventIndex = -1;
//   sortedEvents.forEach((event, index) => {
//     const eventDate = new Date(event.date);
//     if (eventDate <= currentDate) {
//       lastPastEventIndex = index;
//     }
//   });

//   if (lastPastEventIndex === -1) return 0;

//   const progress = ((lastPastEventIndex + 1) / sortedEvents.length) * 100;
//   return progress;
// };

// const Timeline = ({ events }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const calculatedProgress = calculateProgress(events);
//     setProgress(calculatedProgress);
//   }, [events]);

//   return (
//     <div className="relative py-10 px-4 sm:px-8 lg:px-16">
//       {/* Progress Bar */}
//       <div className="relative max-w-full h-2 bg-gray-200 rounded-full mt-4 mb-6">
//         <div
//           className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-1000"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>

//       {/* Timeline Events */}
//       <div className="block md:flex md:justify-between md:items-center relative">
//         {/* Slider for Small Screens */}
//         <div className="md:hidden overflow-x-auto">
//           <div className="flex items-center space-x-8 min-w-max">
//             {events.map((event, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center space-y-4 group min-w-[100px] flex-shrink-0"
//               >
//                 {/* Event Circle */}
//                 <div
//                   className={`relative flex h-12 w-12 items-center justify-center rounded-full border-4 ${
//                     new Date(event.date) <= new Date()
//                       ? "border-primary bg-gradient-to-br from-primary via-secondary to-primary text-black"
//                       : "border-secondary bg-secondary text-white"
//                   } group-hover:scale-110 transition-transform duration-300`}
//                   aria-label={`Event ${index + 1}: ${event.name} on ${event.date}`}
//                 >
//                   <span className="font-bold">{index + 1}</span>
//                   <div className="absolute -z-10 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
//                 </div>

//                 {/* Event Details */}
//                 <div className="text-center transition-transform duration-300 group-hover:-translate-y-2">
//                   <h3 className="font-Bebas text-sm sm:text-base text-primary break-words">
//                     {event.name}
//                   </h3>
//                   <p className="font-Lato text-xs text-secondary opacity-80">
//                     {new Date(event.date).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Full Layout for Larger Screens */}
//         <div className="hidden md:flex md:justify-between md:items-center w-full">
//           {events.map((event, index) => {
//             const eventPosition =
//               events.length > 1 ? (index / (events.length - 1)) * 100 : 50;

//             return (
//               <div
//                 key={index}
//                 className="relative flex flex-col items-center space-y-4 group"
//                 style={{ left: `${eventPosition}%`, position: "absolute" }}
//               >
//                 {/* Event Circle */}
//                 <div
//                   className={`relative flex h-12 w-12 items-center justify-center rounded-full border-4 ${
//                     new Date(event.date) <= new Date()
//                       ? "border-primary bg-gradient-to-br from-primary via-secondary to-primary text-black"
//                       : "border-secondary bg-secondary text-white"
//                   } group-hover:scale-110 transition-transform duration-300`}
//                   aria-label={`Event ${index + 1}: ${event.name} on ${event.date}`}
//                 >
//                   <span className="font-bold">{index + 1}</span>
//                   <div className="absolute -z-10 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
//                 </div>

//                 {/* Event Details */}
//                 <div className="text-center transition-transform duration-300 group-hover:-translate-y-2">
//                   <h3 className="font-Bebas text-sm sm:text-base text-primary break-words">
//                     {event.name}
//                   </h3>
//                   <p className="font-Lato text-xs text-secondary opacity-80">
//                     {new Date(event.date).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;
