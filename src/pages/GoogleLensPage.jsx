import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const GoogleStreetViewPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctAnswer = "hollywood";

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback(
        "Correct! You've found the hidden message on Google Street View. The next clue is unlocked."
      );

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
        navigate("/dancing-with-flags");
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
      <div className="max-w-2xl mx-auto p-6 bg-teal-100 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Geo Guesser!!</h1>
          <h2 className="text-xl mt-2">
            Follow the coordinates, wander around the earth!
          </h2>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Puzzle #7</h3>
          <p className="text-lg text-gray-700">
            Where neon dreams and glimmers play, find the sign that lights the
            way. <br /> In the shadow of fame’s bright glare, the truth awaits
            if you dare to stare.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Coordinates:</h3>
          <p className="text-3xl font-bold text-teal-700">4MMH+J9LA</p>
          {/* Replace with actual coordinates */}
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="mt-6">
            <label htmlFor="streetviewInput" className="text-lg font-semibold mr-4">
              Enter the Hidden Message:
            </label>
            <input
              type="text"
              id="streetviewInput"
              name="streetviewInput"
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

export default GoogleStreetViewPage;
