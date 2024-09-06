import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Enigma = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctAnswer = "NUKETHEUS";

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct!");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 9,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/vX7rT1wLqJbN");
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

  if (lastTaskState >= 8) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-cyan-100 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Enigma</h1>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Puzzle #9</h3>
          <p className="text-lg text-gray-700">
            Prompt: Einstein forgot how to use the enigma machine, help him
            decrypt it. He received the message: KWOVPVBDA His model is Engima
            M3, having reflector UKW B as reflector and with the following
            configurations. Help him for the better good.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-center items-center">
          <img
            src="/enigma.jpeg"
            alt="Enigma Image"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="mt-6">
            <label htmlFor="lensInput" className="text-lg font-semibold mr-4">
              Enter the Answer:
            </label>
            <input
              type="text"
              id="lensInput"
              name="lensInput"
              placeholder="Enter the answer"
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
        You have not completed the previous question
      </p>
    );
  }
};

export default Enigma;
