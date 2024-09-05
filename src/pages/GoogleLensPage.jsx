import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const GoogleLensPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctAnswer = ["Moraine", "Moraine Lake"];

  const checkAnswer = async () => {
    if (
      userInput.trim().toLowerCase() === correctAnswer[0].toLowerCase() ||
      userInput.trim().toLowerCase() === correctAnswer[1].toLowerCase()
    ) {
      setFeedback("Correct!");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 6,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/google-street-view");
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

  if (lastTaskState >= 5) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-cyan-100 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Google Lens: Uncover the Clue</h1>
          <h2 className="text-xl mt-2">
            Use Google Lens to analyze the image and find the hidden message!
          </h2>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Puzzle #6</h3>
          <p className="text-lg text-gray-700">
            The final piece of the puzzle lies hidden in an image. Use Google
            Lens to uncover the hidden message. This step symbolizes the need
            for modern tools and techniques to fully understand Satoshi’s
            legacy.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-center items-center">
          <img
            src="../../moraine.jpeg"
            alt="Hidden Clue"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="mt-6">
            <label htmlFor="lensInput" className="text-lg font-semibold mr-4">
              Enter the Hidden Message:
            </label>
            <input
              type="text"
              id="lensInput"
              name="lensInput"
              placeholder="Enter the hidden message"
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

export default GoogleLensPage;
