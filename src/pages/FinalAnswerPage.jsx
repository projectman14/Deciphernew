import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./FinalAnswerPage.css"; // Ensure you create this CSS file
import Footer from "./Footer";

const FinalAnswerPage = () => {
  const [userInput, setUserInput] = useState(""); // State to manage user input
  const [feedback, setFeedback] = useState(""); // State to manage feedback messages
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0

  // Correct answer for final answer page
  const correctAnswer = "BitcoinFinalKey"; // Replace with the actual hidden message

  useEffect(() => {
    // Check if the user has completed all tasks (up to the required last task)
    if (lastTaskState < 10) {
      setFeedback(
        "You have not completed all required tasks to access the final answer page."
      );
    }
  }, [lastTaskState]);

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback(
        "Congratulations! You've discovered the final answer hidden in plain sight. You've completed the Decipher event!"
      );

      try {
        // Make the API request to submit the final task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 11, // Assuming the task number is 10
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
      } catch (error) {
        setFeedback(
          "There was an error processing your request. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback(
        "Incorrect. Please refer back to the event poster and try again."
      );
    }
  };

  // Conditional rendering based on lastTaskState
  if (lastTaskState < 10) {
    // If the user has not completed the required tasks, show a message
    return (
      <div className="finalanswer-container">
        <header className="finalanswer-header">
          <h1>Access Denied</h1>
        </header>
        <section className="finalanswer-intro">
          <p>{feedback}</p>
        </section>
      </div>
    );
  }

  // Render the Final Answer Page content if the user has completed all required tasks

  return (
    <div className="finalanswer-container">
      <header className="finalanswer-header">
        <h1>The Final Answer Revealed</h1>
        <h2>The answer was hidden in plain sight all along!</h2>
      </header>

      <section className="finalanswer-intro">
        <h3>Puzzle #11</h3>
        <p>
          The final revelation is that the answer was the event name all along!
          But what is the question you may ask? Maybe you'll find what you seek
          here:
        </p>
        <p>
          https://drive.google.com/file/d/12eAz0ru4rSH-sQ4TB825goD6QZR_8_vf/view?usp=drive_link
        </p>
      </section>

      <section className="finalanswer-input">
        <div className="input-section">
          <label htmlFor="finalAnswerInput">Enter the Final Answer:</label>
          <input
            type="text"
            id="finalAnswerInput"
            name="finalAnswerInput"
            placeholder="Enter the final answer"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={checkAnswer} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      <div className="finalanswer-footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default FinalAnswerPage;
