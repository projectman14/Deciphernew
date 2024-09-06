import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import onof from "/onoff.gif";

const BinaryIPAddressPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );

  const navigate = useNavigate();

  const correctIPAddress = import.meta.env.VITE_CORRECT_IP_ADDRESS;

  const checkIPAddress = async () => {
    if (userInput === correctIPAddress) {
      setFeedback("Correct! You've decoded the IP address.");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 3,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;

        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/vN7sJpR6aKqfX9kL3uHcWyQ");
      } catch (error) {
        setFeedback(
          "There was an error processing your request. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  if (lastTaskState >= 2) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-center">
        <header className="bg-indigo-800 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">
            Binary IP Address: Decipher the Digital Clue
          </h1>
          <h2 className="text-xl mt-2">
            Can you decode the binary IP address?
          </h2>
        </header>

        <section className="bg-white p-6 rounded-lg mb-6 shadow-md">
          <div className="flex justify-center">
            <img src={onof} alt="" className="rounded-lg w-full max-w-md" />
          </div>
          <p className="text-lg mt-4">
            Amidst the endless code of ones and zeroes, truth emerges in the
            space between.
            <br />
            Trust the pattern to unveil what hides in plain sight.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Puzzle #3</h3>
          <p className="text-xl font-semibold text-indigo-800 mb-4 break-words">
            <b>DECIPHER</b> THIS:{" "}
            <span className="break-all">
              10101100.00000010.00010110.00000001
            </span>
          </p>
          <div className="mt-6">
            <label
              htmlFor="ipInput"
              className="block text-lg font-semibold mb-2"
            >
              Enter the Decoded IP:
            </label>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <input
                type="text"
                id="ipInput"
                name="ipInput"
                placeholder="Enter the IP address in standard form"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0 md:mr-4"
              />
              <button
                type="button"
                onClick={checkIPAddress}
                className="w-full md:w-auto px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-900 transition"
              >
                Submit
              </button>
            </div>
          </div>

          {feedback && (
            <p className="text-red-600 font-semibold mt-4">{feedback}</p>
          )}
        </section>

        <div className="mt-12">
          <Footer />
        </div>
      </div>
    );
  } else {
    return <p>You have not completed the previous question</p>;
  }
};

export default BinaryIPAddressPage;
