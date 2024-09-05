import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import Footer from "./Footer";
import image from "/timecapsule.gif";
import image2 from "/satoshi.jpg";

export const DecipherPage = () => {
  const [userInput, setUserInput] = useState(""); // State to manage user input
  const [feedback, setFeedback] = useState(""); // State to manage feedback messages
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate(); // Hook to handle navigation

  const correctAnswer = [
    import.meta.env.VITE_CORRECT_ANSWER_DECIPHER,
    "whitepapers",
  ];

  const checkCode = async () => {
    if (
      userInput.toLowerCase() === correctAnswer[0].toLowerCase() ||
      userInput.toLowerCase() === correctAnswer[1].toLowerCase()
    ) {
      setFeedback("Correct! You've unlocked the next clue.");

      try {
        setIsLoading(true); // Start loading

        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 1, // Replace with the correct task number
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        navigate("/mL2wX1oTtQdE");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setFeedback(error.response.data.message); // Display backend error message
        } else {
          setFeedback(
            "There was an error processing your request. Please try again later."
          );
        }
        console.error("Error submitting task:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 text-center max-w-4xl">
      <header className="bg-gray-800 text-white p-5 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Decipher: The First Clue</h1>
        <h2 className="text-xl mt-2">Unlock the Past, Secure the Future</h2>
      </header>

      <div className="bg-white p-5 rounded-lg mb-6 shadow-lg flex">
        <div>
          <img className="rounded-lg shadow-md max-w-xs" src={image2} alt="" />
        </div>
        <div className="ml-8 text-left">
          <h3 className="text-lg font-semibold">#Fact</h3>
          <p className="text-gray-700 mt-3">
            <i>
              Satoshi Nakamoto laid the foundation of Blockchain using the
              already existing techniques such as Distributed Systems,
              Cryptography, etc. Bitcoin (BTC, native Cryptocurrency) is the
              north star of the Chain.
            </i>
          </p>
        </div>
      </div>

      <section className="bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-5">Puzzle #1</h1>
        <img
          src={image}
          alt="Time Capsule"
          className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-5"
        />
        <p className="text-lg text-gray-800 mb-5">
          <b>TODO:</b> Shift each glyph to where shadows linger, thrice removed
          from the light, and the secret will reveal itself.
          <br />
          <b>Hint:</b> “History Always Wins, <b>Reading</b> Power is your best
          friend!”
          <br />
          <br />
          The phrase is: <b>ZKLWHSDSHU</b>
        </p>
        <div className="mt-5">
          <label
            htmlFor="code"
            className="block text-gray-700 text-lg font-medium mb-2"
          >
            Enter the Code:
          </label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Enter the deciphered code here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
          />
          <button
            type="button"
            onClick={checkCode}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {feedback && (
          <p className="mt-5 text-red-600 font-medium">{feedback}</p>
        )}
      </section>

      <div className="bg-gray-800 text-white p-4 rounded-lg mt-6">
        <Footer />
      </div>
    </div>
  );
};
