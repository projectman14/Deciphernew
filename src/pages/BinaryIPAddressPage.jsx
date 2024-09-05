import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BinaryIPAddressPage.css"; // Ensure you create this CSS file
import axios from "axios"; // Import axios
import Footer from "./Footer";
import onof from "/onoff.gif";

const BinaryIPAddressPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0

  const navigate = useNavigate(); // Hook to handle navigation

  // The correct answer after decoding the binary IP address
  const correctIPAddress = import.meta.env.VITE_CORRECT_IP_ADDRESS;

  // Replace with your own binary encoded IP address equivalent

  const checkIPAddress = async () => {
    if (userInput === correctIPAddress) {
      setFeedback("Correct! You've decoded the IP address.");

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 3, // Assuming the task number is 5
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/caesar-cipher"); // Replace '/next-page' with the actual path to your next page
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

  // Render content based on the current task state
  if (lastTaskState >= 2) {
    // Assuming the user must complete task 4 to access this page
    return (
      <div className="binary-ip-container">
        <header className="binary-ip-header">
          <h1>Binary IP Address: Decipher the Digital Clue</h1>
          <h2>Can you decode the binary IP address?</h2>
        </header>

        <section className="binary-ip-intro">
          <div>
            <img src={onof} alt="" />
          </div>
          <p>
            Amidst the endless code of ones and zeroes, truth emerges in the
            space between. <br />
            Trust the pattern to unveil what hides in plain sight.
          </p>
        </section>

        <section className="binary-ip-puzzle">
          <h3>Puzzle #3</h3>
          <p className="binary-hint">
            <b>DECIPHER</b> THIS : 1111111.0000000.0000000.0000001
          </p>
          <div className="input-section">
            <label htmlFor="ipInput">Enter the Decoded IP :</label>
            <input
              type="text"
              id="ipInput"
              name="ipInput"
              placeholder="Enter the IP address in standard form"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="button" onClick={checkIPAddress}>
              Submit
            </button>
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
          {/* 
          {showNextButton && (
            <div className="next-button">
              <button onClick={handleNextClick}>Next</button>
            </div>
          )} */}
        </section>

        <div className="binary-ip-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default BinaryIPAddressPage;
