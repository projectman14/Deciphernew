import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CaesarCipherPage.css";
import Footer from "./Footer";
import LnmiitMap from "/lnmiitmap.png";

const Brainfuck = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  // Initialize allternateQuestion state from localStorage
  const [allternateQuestion, setallternateQuestion] = useState(
    localStorage.getItem("allternateQuestion") || false
  );

  const [correctAnswer, setcorrectAnswer] = useState("pointer");

  useEffect(() => {
    // Save allternateQuestion state to localStorage whenever it changes
    localStorage.setItem("allternateQuestion", allternateQuestion);
    if (allternateQuestion) {
      setcorrectAnswer("pointer2");
    } else {
      setcorrectAnswer("pointer");
    }
  }, [allternateQuestion]);

  const alternateQuestionHandler = async () => {
    setallternateQuestion(true);

    // setcorrectAnswer("pointer2");
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
      <div className="caesar-container">
        <header className="caesar-header">
          <h1>Brain Fuck: Uncover the Hidden Message</h1>
          <h2>Decode the cipher to move to next level</h2>
        </header>

        <section className="caesar-intro">
          <h3>Puzzle #10</h3>
          {!allternateQuestion ? (
            <div>
              <p>
                As you delve deeper into the world of cryptography, you
                encounter a non-classic, not very family-friendly form of
                encryption. Decode the cipher to reveal the location of the next
                clue.
              </p>
            </div>
          ) : (
            <div>
              <p>Alternate Question</p>
              <img src={LnmiitMap} alt="Lnmiit Map" className="lnmiitimg" />
            </div>
          )}
        </section>

        <section className="caesar-puzzle">
          <p className="cipher-text">
            {!allternateQuestion ? brainfuckCode : "String alternatee is lawda"}
          </p>
          <div className="input-section">
            <label htmlFor="cipherInput">Enter the Decoded Message:</label>
            <input
              type="text"
              id="cipherInput"
              name="cipherInput"
              placeholder="Enter the decoded location"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="btn-1" type="button" onClick={checkAnswer}>
              Submit
            </button>
            {!allternateQuestion && (
              <button
                className="btn-2"
                type="button"
                onClick={alternateQuestionHandler}
              >
                Alternate
              </button>
            )}
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
        </section>

        <div className="caesar-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <p>You have not completed the previous question</p>;
  }
};

export default Brainfuck;
