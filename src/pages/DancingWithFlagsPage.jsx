import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Footer from "./Footer";

const DancingWithFlagsPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );

  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the flag signals
  const correctAnswer = import.meta.env.VITE_CORRECT_ANSWER_DANCING; // Replace with your actual correct answer

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the flag signals.");

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 8, // Assuming the task number is 8
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/vX7rT1wLqJbN"); // Replace with actual path
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

  if (lastTaskState >= 7) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-gray-50 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Dancing with Flags</h1>
          <h2 className="text-xl mt-2">
            Watch carefully and uncover the hidden message!
          </h2>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Puzzle #8</h3>
          <p className="text-lg text-gray-700">
            With colors swirling in a dance so grand, the signals speak where
            flags command. <br /> Decode their rhythm in the signal’s flight,
            and hidden messages will come to light.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-center items-center">
          {/* Placeholder for the video. Replace src with actual video URL */}
          <img
            src="../../genesis.jpeg"
            alt="Video Placeholder"
            className="max-w-full h-auto"
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="mt-6">
            <label htmlFor="flagInput" className="text-lg font-semibold mr-4">
              Enter the Decoded Message:
            </label>
            <input
              type="text"
              id="flagInput"
              name="flagInput"
              placeholder="Enter the decoded message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            />
            <button
              type="button"
              onClick={checkAnswer}
              className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition"
            >
              Submit
            </button>
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
    return (
      <p className="text-center text-lg">
        You have not completed the previous question.
      </p>
    );
  }
};

export default DancingWithFlagsPage;
