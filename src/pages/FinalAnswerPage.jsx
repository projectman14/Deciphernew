import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
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
    if (lastTaskState < 11) {
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
            taskNumber: 12, // Assuming the task number is 11
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
  if (lastTaskState < 11) {
    // If the user has not completed the required tasks, show a message
    return (
      <div className="max-w-2xl mx-auto p-6 bg-green-50 text-center">
        <header className="bg-teal-900 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Access Denied</h1>
        </header>
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p className="text-base text-gray-800">{feedback}</p>
        </section>
      </div>
    );
  }

  // Render the Final Answer Page content if the user has completed all required tasks
  return (
    <div className="max-w-2xl mx-auto p-6 bg-green-50 text-center">
      <header className="bg-teal-900 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">The Final Answer Revealed</h1>
        <h2 className="text-xl mt-2">The answer was hidden in plain sight all along!</h2>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Puzzle #11</h3>
        <p className="text-base text-gray-800 mb-4">
          The final revelation is that the answer was the event name all along!
          But what is the question you may ask? Maybe you'll find what you seek
          here:
        </p>
        <a
          href="https://drive.google.com/file/d/12eAz0ru4rSH-sQ4TB825goD6QZR_8_vf/view?usp=drive_link"
          className="text-blue-500 underline"
        >
          Google Drive Link
        </a>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mt-6">
          <label
            htmlFor="finalAnswerInput"
            className="block text-lg font-semibold mb-2"
          >
            Enter the Final Answer:
          </label>
          <input
            type="text"
            id="finalAnswerInput"
            name="finalAnswerInput"
            placeholder="Enter the final answer"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            type="button"
            onClick={checkAnswer}
            disabled={isLoading}
            className="px-4 py-2 bg-teal-900 text-white rounded-md hover:bg-teal-800 transition"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {feedback && (
          <p className="text-red-600 font-semibold mt-4">{feedback}</p>
        )}
      </section>

      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default FinalAnswerPage;
