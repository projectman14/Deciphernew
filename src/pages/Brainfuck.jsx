import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import LnmiitMap from "/lnmiitmap.png";
import LnmiitMap2 from "/lnmiit_map.jpeg";

const Brainfuck = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  // Initialize alternateQuestion state from localStorage
  const [allternateQuestion, setallternateQuestion] = useState(
    localStorage.getItem("allternateQuestion") || false
  );

  const [correctAnswer, setcorrectAnswer] = useState("pointer");

  useEffect(() => {
    // Save allternateQuestion state to localStorage whenever it changes
    localStorage.setItem("allternateQuestion", allternateQuestion);
    if (allternateQuestion) {
      setcorrectAnswer("man in the middle");
    } else {
      setcorrectAnswer("pointer");
    }
  }, [allternateQuestion]);

  const alternateQuestionHandler = async () => {
    setallternateQuestion(true);
  };

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the Brainfuck cipher.");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 12, // Assuming the task number is 10
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/boKachoDa");
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
+[------->++<]>++.-.------.+++++.++++++.+++[->+++<]>.+++++++++++++.`;

  if (lastTaskState >= 11) {
    return (
      <div className="caesar-container max-w-4xl mx-auto my-12 p-6 bg-yellow-50 text-center rounded-lg shadow-lg">
        <header className="caesar-header bg-[#a1306e] text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">
            Brain Fuck: Uncover the Hidden Message
          </h1>
          <h2 className="text-xl mt-2">
            Decode the cipher to move to next level
          </h2>
        </header>

        <section className="caesar-intro bg-white p-6 rounded-lg mb-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Puzzle #12</h3>
          {!allternateQuestion ? (
            <div>
              <p className="text-base text-gray-800">
                As you delve deeper into the world of cryptography, you
                encounter a non-classic, not very family-friendly form of
                encryption. Decode the cipher to reveal the location of the next
                clue.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base text-gray-800">Alternate Question</p>
              <img
                src={LnmiitMap}
                alt="Lnmiit Map"
                className="lnmiitimg mx-auto mt-4"
              />
              <h3 className="text-xl font-semibold mb-4">OR</h3>
              <img
                src={LnmiitMap2}
                alt="Lnmiit Map"
                className="lnmiitimg mx-auto mt-4"
              />
            </div>
          )}
        </section>

        <section className="caesar-puzzle bg-white p-6 rounded-lg shadow-sm">
          <p className="cipher-text text-lg font-bold text-[#a1306e] mb-4">
            {!allternateQuestion
              ? brainfuckCode
              : "Answer of previous question is Decipher"}
          </p>
          <div className="input-section mt-4">
            <label htmlFor="cipherInput" className="block text-base mb-2">
              Enter the Decoded Message:
            </label>
            <input
              type="text"
              id="cipherInput"
              name="cipherInput"
              placeholder="Enter the decoded location"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="p-2 text-base border rounded-lg border-gray-300 mb-2"
            />
            <button
              className="btn-1 bg-[#a1306e] text-white py-2 px-4 rounded-lg hover:bg-[#9b0d61] ml-2"
              type="button"
              onClick={checkAnswer}
            >
              Submit
            </button>
            {!allternateQuestion && (
              <button
                className="btn-2 bg-[#a1306e] text-white py-2 px-4 rounded-lg hover:bg-[#9b0d61] ml-2"
                type="button"
                onClick={alternateQuestionHandler}
              >
                Alternate
              </button>
            )}
          </div>

          {feedback && (
            <p className="feedback-message text-red-500 text-base mt-4">
              {feedback}
            </p>
          )}
        </section>

        {/* <div className="caesar-footer bg-[#a1306e] text-white p-4 rounded-lg mt-6"> */}
        <Footer />
        {/* </div> */}
      </div>
    );
  } else {
    return (
      <p className="text-center text-lg text-gray-800">
        You have not completed the previous question
      </p>
    );
  }
};

export default Brainfuck;
