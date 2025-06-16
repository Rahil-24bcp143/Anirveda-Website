// NOTE: This code is too monolithic. Problem of refactoring into smaller components is that, we need to pass a lot of props to the child components. That's why it is monolithic :)

import React, { useState, useEffect } from "react"
import axios from "axios"
import ReactModal from "react-modal"

import InfoModal from "./InfoModal"
import AlertModal from "./AlertModal"
import {useAuth0} from "@auth0/auth0-react"

export default function Play() {
  const { user, isAuthenticated } = useAuth0();

  const [currentSituation, setCurrentSituation] = useState({
    situation: "Please wait... Click on Get Situation to start the game",
  })
  const [balance, setBalance] = useState(500)
  const [isLoading, setIsLoading] = useState(false)
  const [showTimer, setShowTimer] = useState(true)
  const [isButtonClicked, setIsButtonClicked] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isReloadButtonClicked, setIsReloadButtonClicked] = useState(false)
  const [isReloadButtonDisabled, setIsReloadButtonDisabled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [indexOfButtonChoice, setIndexOfButtonChoice] = useState(0)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [impact,setImpact] = useState(null)

  // Need to manage extra state for reload button click, because if we use isReloadButtonClicked, then it leads to generation of one bug. Bug description: If we use isReloadButtonClicked in handleReloadComponent just after setIsLoading(true), then it leads to situation where on clicking "Get Situation", choices become active but timer does not start
  const [isReloadButtonClicked1, setisReloadButtonClicked1] = useState(false)

  const [timeTaken,setTimetaken] = useState(0);

  //    Countdown Timer.
  // Pass number of seconds in useState to set the timer duration
  const [time, setTime] = useState(90)

   const API_URL = "https://mock-rbi-server.vercel.app/api/v1"

  //  const API_URL = "http://localhost:3000/api/v1"

   useEffect(() => {
    if (isAuthenticated && user) {
      axios
        .get(`${API_URL}/leaderboard/${user.email}`)
        .then((response) => {
          if (response.data && response.data.balance !== undefined && response.data.timeTaken != undefined) {
            setBalance(response.data.balance);
            setTimetaken(response.data.timeTaken);
            localStorage.setItem("balance", response.data.balance);
            localStorage.setItem("timeTaken", response.data.timeTaken);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // If user not found, create with default balance
            axios.post(`${API_URL}/leaderboard/`, {
                email: user.email,
                balance: 500,
                timeTaken: 0
            }).then(() => {
                setBalance(500);
                setTimetaken(0);
                localStorage.setItem("balance", 500);
                localStorage.setItem("timeTaken", 0);
            }).catch(err => console.error("Error creating user:", err));
        } else {
            console.error("Error fetching balance:", error);
        }
        });
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    let timer
    if (time > 0 && isReloadButtonClicked && !isButtonClicked) {
      timer = setTimeout(() => setTime(time - 1), 1000)
    } else {
      setIsButtonDisabled(true)
      setIsReloadButtonDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [time, isReloadButtonClicked])


  const handleButtonClick = async(choice) => {

    if (!isAuthenticated || !user) {
        console.error("User is not authenticated");
        return;
    }
    console.log("User clicked choice:", choice);

    // Find the index of the clicked choice in currentSituation.options
    const indexOfButtonChoice = currentSituation.options.findIndex(option => option.choice === choice);
    
    if (indexOfButtonChoice === -1) {
        console.error("Choice not found in options.");
        return;
    }

    setIndexOfButtonChoice(indexOfButtonChoice);

    // Get the corresponding option details
    const correspondingOption = currentSituation.options[indexOfButtonChoice];
    console.log("Corresponding Option:", correspondingOption);

    // Modify balance based on impact
    const newBalance = balance + correspondingOption.impact;
    const newTime = 90 - time;
    const totalTime = timeTaken + newTime;
    setBalance((prevbalance) => prevbalance + correspondingOption.impact);
    setTimetaken((prevTime)=>(prevTime + newTime));
    localStorage.setItem("balance", newBalance);
    localStorage.setItem("timeTaken", totalTime);

    setImpact(correspondingOption.impact)

    // Log impact status (can be used for UI updates)
    // console.log("Impact Status:", correspondingOption.impactStatus);
    setIsCorrectAnswer(correspondingOption.impact > 0);

    // Update button and modal state
    setIsButtonClicked(true);
    setIsReloadButtonClicked(false);
    setIsModalOpen(true);

    try {
      await axios.post("https://mock-rbi-server.vercel.app/api/v1/leaderboard/", {
          email: user.email,
          balance: newBalance,
          timeTaken: totalTime
      });
  } catch (error) {
      console.error("Error updating balance:", error);
  }
};
  //   console.log(isButtonClicked)

  // Fetching new situation from API every time a reload button is clicked
  // const BASE_URL = "http://localhost:3000/api/v1/situation/"
  const BASE_URL = "https://mock-rbi-server.vercel.app/api/v1/situation/"
  const handleReloadComponent = () => {
    setIsLoading(true)
    setisReloadButtonClicked1(true)
    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res.data)
        setIsLoading(false)
        // setShowTimer(true)

        if (!res.data || !res.data.situation || res.data.situation == "undefined") { 
          // If API response is empty or undefined, show alert modal
          setIsAlertModalOpen(true);
          return;
        }

        if (currentSituation.situation === res.data.situation) {
          setIsAlertModalOpen(true)
        } else {
          setCurrentSituation(res.data)
          setIsButtonClicked(false)
          setIsButtonDisabled(false)
          setIsReloadButtonClicked(true)
          setTime(90)
          setIsReloadButtonDisabled(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // console.log(currentSituation)

  // Modal Styles
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
      height: "fit-content",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      width: "60vw",
      border: "none",
    },
  }

  function closeModal() {
    setIsModalOpen(false)
    setIsAlertModalOpen(false)
  }

  return (
    <>
      <div className="mt-16">
        {/* Timer */}
        <div
          className={ `${
            showTimer ? "fixed md:hidden" : "hidden"
          }  top-36 left-1/2 z-10 -translate-x-1/2 rounded-md bg-secondary-opacity text-center `}
        >
          <div className="px-3 py-2">
            <h1 className=" font-Lato text-xl font-semibold text-secondary xs:text-2xl">
              Time Left: 00:{time < 10 ? `0${time}` : time}
            </h1>
          </div>
        </div>

        <div className="mt-24 text-center md:hidden">
          <h1 className="font-Lato text-4xl font-semibold text-primary">
            Your Balance
          </h1>
          <h2 className="mt-2 font-Lato text-3xl font-semibold text-primary">
            ₹ {localStorage.getItem("balance")}
          </h2>
        </div>

        <div className="mt-12 text-center md:mt-4 flex flex-col items-center">
          <h1 className="font-Lato text-4xl font-semibold text-primary text-center">
            Situation
          </h1>
          <p className="mt-3 text-xl text-secondary md:mx-auto md:w-[90%] xl:w-4/5 xl:text-2xl">
            {isLoading && isReloadButtonClicked1
              ? "Loading..."
              :  `${currentSituation.name ? currentSituation.name : ""} 
                ${currentSituation.name ? ":" : ""}
              ${currentSituation.situation}`}
          </p>

          <div className="mt-4 flex items-center justify-center md:hidden flex-col">
            <button
              className={`rounded-md border-[2px] border-transparent bg-tertiary px-3 py-1  text-lg text-secondary ${
                isReloadButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              } `}
              disabled={isReloadButtonDisabled}
              onClick={handleReloadComponent}
            >
              Get New Situation
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-7 flex flex-col items-center">
          <h1 className="text-center font-Lato text-4xl font-semibold text-primary">
            Make your choice
          </h1>

          <div className="mt-7 space-y-7 sm:flex sm:flex-row sm:flex-wrap sm:gap-6 sm:space-y-0 md:mt-6 lg:justify-center lg:gap-6 w-full">
            {currentSituation.options?.map((_, index) => (
              <div
                key={index}
                className="flex flex-col  items-center rounded-lg bg-tertiary py-4 xs:mx-auto xs:w-4/5 sm:w-3/6  md:w-[40%] lg:mx-0 lg:w-72 xl:w-80"
              >
                <img
      className="w-full h-auto"
                  src={"/images/mockrbi/saveMoney.png"}
                  alt={"Save money"}
                  // className="w-3/4 xs:w-3/5"
                />
                <button
                  className={`my-5 mx-4 rounded-md border-[2px] border-transparent bg-primary px-4 pt-1 pb-2  text-2xl text-white transition-colors duration-300 
                    ${
                      isButtonClicked || isButtonDisabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer opacity-100 hover:border-[2px] hover:border-primary hover:bg-transparent hover:text-primary "
                    }
                      `}
                  disabled={isButtonClicked || isButtonDisabled}
                  onClick={() =>
                    handleButtonClick(currentSituation.options[index].choice)
                  }
                >
                  {currentSituation.options[index].choice}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* This Balance and Timer will be visible on larger screens */}
        <div className="mt-8 hidden px-10 pb-8 md:flex md:justify-between flex-col md:flex-row">
          {/* Timer */}
          <div className={`${showTimer ? "md:flex" : "invisible"}`}>
            <h1 className="font-Lato text-3xl font-semibold text-primary">
              Time Left : 00:{time < 10 ? `0${time}` : time}
            </h1>
          </div>
          {/* Balance */}
          <h1 className="font-Lato text-3xl font-semibold text-primary">
            Your Balance : ₹ {balance}
          </h1>
          {/* Reload Component Button */}
          <div className="flex items-center">
            <button
              className={`rounded-md border-[2px] border-transparent bg-tertiary px-3 py-1  text-lg text-secondary ${
                isReloadButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              } `}
              disabled={isReloadButtonDisabled}
              onClick={handleReloadComponent}
            >
              Get New Situation
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ReactModal isOpen={isModalOpen} style={customStyles} ariaHideApp={false}>
        <InfoModal
          closeModal={closeModal}
          // dummySituation={currentSituation}
          // indexOfButtonChoice={indexOfButtonChoice}
          impact={impact}
          balance={balance}
          isCorrectAnswer={isCorrectAnswer}
        />
      </ReactModal>

      {/* Alert Modal */}
      <ReactModal
        isOpen={isAlertModalOpen}
        style={customStyles}
        ariaHideApp={false}
      >
        <AlertModal closeModal={closeModal} />
      </ReactModal>
    </>
  )
}
