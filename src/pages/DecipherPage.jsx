import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "./DecipherPage.css"; // Make sure to create this CSS file
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

  const correctAnswer = import.meta.env.VITE_CORRECT_ANSWER_DECIPHER;

  // useEffect(() => {
  //   // Check if the user has completed the necessary tasks to access this page
  //   if (lastTaskState < 1) {
  //     setFeedback(
  //       "You have not completed the required tasks to access this page."
  //     );
  //   }
  // }, [lastTaskState]);

  const checkCode = async () => {
    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've unlocked the next clue.");
      // You can add code here to navigate to the next page or reveal more content

      try {
        setIsLoading(true); // Start loading

        // Make the API request to submit the task progress
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 1, // Replace with the correct task number
            team: localStorage.getItem("teamName"),
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        // Navigate to the next page or handle success as needed
        navigate("/location-hunt");
      } catch (error) {
        // Handle error response from backend
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

  // Conditional rendering based on lastTaskState

  // Render the Decipher Page content if the user has completed all required tasks
  return (
    <div className="decipher-container">
      <header className="decipher-header">
        <h1>Decipher: The First Clue</h1>
        <h2>Unlock the Past, Secure the Future</h2>
      </header>

      <div className="decipher-intro">
        <div>
          <img className="image2a" src={image2} alt="" />
        </div>

        <p className="paragraph">
          <h3>#Fact</h3>
          <i>
            <p>
              Satoshi Nakamoto laid the foundation of Blockchain using the
              already existing techniques such as Distributed Systems,
              Cryptography, etc.
            </p>
            <p>
              Bitcoin (BTC, native Cryptocurrency) is the north star of the
              Chain.
            </p>
          </i>
        </p>
      </div>

      <section className="decipher-puzzle">
        <h1>Puzzle #1</h1>
        <img src={image} alt="Time Capsule" className="time-capsule-image" />
        <p className="puzzle-text">
          <b> TODO:</b> Shift each glyph to where shadows linger, thrice removed
          from the light, and the secret will reveal itself.
          <br />
          <b>Hint:</b> “History Always Wins, <b>Reading</b> Power is your best
          friend!”
          <br />
          <br />
          The phrase is: <b>ZKLWHSDSHU </b>
        </p>
        <div className="puzzle-input">
          <label htmlFor="code">Enter the Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Enter the deciphered code here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={checkCode} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      <div className="decipher-footer">
        <Footer></Footer>
      </div>
    </div>
  );
};
