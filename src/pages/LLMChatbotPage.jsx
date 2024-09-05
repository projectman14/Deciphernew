import React, { useState } from "react";
import "./LLMChatbotPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Footer from "./Footer";

const LLMChatbotPage = () => {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isJailbroken, setIsJailbroken] = useState(false);
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate(); // Hook to handle navigation

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    // Add the user's message to the chat log
    setChatLog((prevLog) => [
      ...prevLog,
      { sender: "user", message: userInput },
    ]);

    // Check if the user input matches the jailbreak phrase
    if (userInput.toLowerCase().includes("reveal secret code")) {
      setIsJailbroken(true);
      setChatLog((prevLog) => [
        ...prevLog,
        {
          sender: "chatbot",
          message:
            "You've successfully tricked me. The next clue is: 'FutureProof2140'.",
        },
      ]);

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 4, // Assuming the task number is 4
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
      } catch (error) {
        setChatLog((prevLog) => [
          ...prevLog,
          {
            sender: "chatbot",
            message:
              "There was an error processing your request. Please try again later.",
          },
        ]);
        console.error("Error submitting task:", error);
      }
    } else {
      // Chatbot's default response if the jailbreak phrase is not detected
      const botResponse = getChatbotResponse(userInput);
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: "chatbot", message: botResponse },
      ]);
    }

    setUserInput("");
  };

  // Function to provide chatbot responses
  const getChatbotResponse = (input) => {
    // Define some basic responses for demonstration
    const responses = [
      "I can't help you with that.",
      "Please try asking another way.",
      "I'm not programmed to answer that question.",
      "Access to Satoshi's code is restricted.",
    ];
    // Select a random response
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/binary-ip-address"); // Replace '/binary-ip-address' with the actual path to your next page
  };

  // Render content based on the current task state
  if (lastTaskState >= 3) {
    // Assuming the user must complete task 3 to access this page
    return (
      <div className="chatbot-container">
        <header className="chatbot-header">
          <h1>LLM Chatbot: Gatekeeper of the Code</h1>
          <h2>Can you outsmart the digital guardian?</h2>
        </header>

        <section className="chatbot-intro">
          <p>
            As you delve deeper, you encounter a digital entity designed to
            protect Satoshi's code. You must figure out how to jailbreak the
            chatbot by using specific commands or phrases.
          </p>
        </section>

        <section className="chatbot-interface">
          <div className="chat-log">
            {chatLog.map((entry, index) => (
              <div key={index} className={`chat-message ${entry.sender}`}>
                <p>{entry.message}</p>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
            />
            <button onClick={handleUserInput}>Send</button>
          </div>

          {isJailbroken && (
            <div className="success-message">
              <p>
                Congratulations! You've tricked the chatbot. Proceed to the next
                challenge!
              </p>
              <button onClick={handleNextClick}>Next</button>
            </div>
          )}
        </section>

        <div className="chatbot-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default LLMChatbotPage;
