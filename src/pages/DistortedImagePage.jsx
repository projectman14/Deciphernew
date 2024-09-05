import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./DistortedImagePage.css"; // Ensure you create this CSS file
import Footer from "./Footer";

const DistortedImagePage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  // const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after analyzing or reversing the distortion
  const correctAnswer = import.meta.env.VITE_CORRECT_ANSWER_DISTORTED; // Replace with the actual decoded message

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've deciphered the image.");
      // setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 5, // Assuming the task number is 8
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/google-lens"); // Replace '/next-page' with the actual path to your next page
      } catch (error) {
        setFeedback(
          "There was an error processing your request. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback("Incorrect. Please try again.");
      // setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  // Render content based on the current task state
  if (lastTaskState >= 4) {
    // Assuming the user must complete task 7 to access this page
    return (
      <div className="distorted-container">
        <header className="distorted-header">
          <h1>Distorted Image: Reveal the Hidden Clue</h1>
          <h2>Awareness is Light, Unawareness is Darkness!</h2>
        </header>
        <h3>Puzzle #5</h3>
        <section className="distorted-image">
          {/* Placeholder for the distorted image. Replace src with actual image URL */}
          <img
            src="../../innovatenew.png"
            alt="Distorted Clue"
            className="distorted-puzzle-image"
            style={{ transform: "scaleX(-1)" }}
          />
        </section>

        <section className="distorted-puzzle">
          <div className="input-section">
            <label htmlFor="imageInput">Enter the Decoded Message:</label>
            <input
              type="text"
              id="imageInput"
              name="imageInput"
              placeholder="Enter the decoded message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="button" onClick={checkAnswer}>
              Submit
            </button>
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
        </section>

        <div className="distorted-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default DistortedImagePage;
