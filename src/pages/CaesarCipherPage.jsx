import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import LnmiitMap from "/lnmiitmap.png";

const Brainfuck = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  // Initialize alternateQuestion state from localStorage
  const [alternateQuestion, setAlternateQuestion] = useState(
    localStorage.getItem("alternateQuestion") || false
  );

  const [correctAnswer, setCorrectAnswer] = useState("pointer");

  useEffect(() => {
    // Save alternateQuestion state to localStorage whenever it changes
    localStorage.setItem("alternateQuestion", alternateQuestion);
    if (alternateQuestion) {
      setCorrectAnswer("pointer2");
    } else {
      setCorrectAnswer("pointer");
    }
  }, [alternateQuestion]);

  const alternateQuestionHandler = async () => {
    setAlternateQuestion(true);
  };

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the Brainfuck cipher.");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 10, // Assuming the task number is 10
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/final-answer");
        setUserInput(""); // Clear the input field
      } catch (error) {
        setFeedback(
          "There was an error submitting the task. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  const brainfuckCode = `
+[------->++<]>++.-.------.+++++.++++++.+++[->+++<]>.+++++++++++++.`; // pointer

  if (lastTaskState >= 9) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-yellow-50 text-center">
        <header className="bg-purple-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Brainfuck: Uncover the Hidden Message</h1>
          <h2 className="text-xl mt-2">Decode the cipher to move to the next level</h2>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Puzzle #10</h3>
          {!alternateQuestion ? (
            <div>
              <p className="text-base text-gray-800">
                As you delve deeper into the world of cryptography, you encounter
                a non-classic, not very family-friendly form of encryption. Decode
                the cipher to reveal the location of the next clue.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base text-gray-800">Alternate Question</p>
              <img
                src={LnmiitMap}
                alt="Lnmiit Map"
                className="w-full max-w-2xl h-72 object-contain mx-auto"
              />
            </div>
          )}
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p className="text-xl font-bold text-purple-700 mb-6">
            {!alternateQuestion ? brainfuckCode : "String alternatee is lawda"}
          </p>
          <div className="mt-6">
            <label htmlFor="cipherInput" className="text-lg font-semibold mr-4">
              Enter the Decoded Message:
            </label>
            <input
              type="text"
              id="cipherInput"
              name="cipherInput"
              placeholder="Enter the decoded location"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            />
            <button
              className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
              type="button"
              onClick={checkAnswer}
            >
              Submit
            </button>
            {!alternateQuestion && (
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition ml-4"
                type="button"
                onClick={alternateQuestionHandler}
              >
                Alternate
              </button>
            )}
          </div>

          {feedback && (
            <p className="text-red-600 font-semibold mt-4">{feedback}</p>
          )}
        </section>

        <div className="mt-8">
          <Footer />
        </div>
      </div>
    );
  } else {
    return <p className="text-center text-lg">You have not completed the previous question.</p>;
  }
};

export default Brainfuck;
