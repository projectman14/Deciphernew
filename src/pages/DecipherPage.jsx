import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const DistortedImagePage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctAnswer = import.meta.env.VITE_CORRECT_ANSWER_DISTORTED;

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've deciphered the image.");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 5,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/google-lens");
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

  if (lastTaskState >= 4) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-cyan-100 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Distorted Image: Reveal the Hidden Clue</h1>
          <h2 className="text-xl mt-2">Awareness is Light, Unawareness is Darkness!</h2>
        </header>
        <h3 className="text-2xl font-semibold mb-6">Puzzle #5</h3>
        <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-center items-center">
          {/* Placeholder for the distorted image. Replace src with actual image URL */}
          <img
            src="../../innovatenew.png"
            alt="Distorted Clue"
            className="w-full max-w-lg rounded-lg shadow-lg transform scale-x-[-1]"
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="mt-6">
            <label htmlFor="imageInput" className="text-lg font-semibold mr-4">
              Enter the Decoded Message:
            </label>
            <input
              type="text"
              id="imageInput"
              name="imageInput"
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
    return <p className="text-center text-lg">You have not completed the previous question</p>;
  }
};

export default DistortedImagePage;
