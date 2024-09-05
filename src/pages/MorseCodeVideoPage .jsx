import { useState } from "react";
import "./MorseCodeVideoPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Footer from "./Footer";

const MorseCodeVideoPage = () => {
  const [decodedMessage, setDecodedMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate();

  const correctMessage = "kernel"; // Replace with the actual Morse code message decoded

  const checkMessage = async () => {
    if (decodedMessage.toLowerCase() === correctMessage) {
      setFeedback("Correct! You've deciphered the hidden Morse code message.");

      // You can add code here to navigate to the next page or reveal more content

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 9, // Assuming the task number is 3
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        // Navigate to the next page after successfully submitting the task
        navigate("/brain-fuck");
      } catch (error) {
        setFeedback(
          "There was an error submitting the task. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback(
        "Incorrect. Keep an eye on the blinking pattern and try again!"
      );
    }
  };

  // Render content based on the current task state
  if (lastTaskState >= 8) {
    return (
      <div className="morse-code-container">
        <header className="morse-code-header">
          <h1>Morse Code Video: Hidden in Plain Sight</h1>
          <h2>Can you decode the message?</h2>
        </header>

        <section className="morse-code-intro">
          <h3>Puzzle #9</h3>
          <p>
            In the silent ballet of coded light, observe the pattern within the
            night. <br /> With careful gaze and patient ear, the message hidden
            will soon appear.
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.wikihow.com%2Fimages%2Fthumb%2F1%2F17%2FLearn-Morse-Code-Step-2-Version-4.jpg%2Fv4-460px-Learn-Morse-Code-Step-2-Version-4.jpg.webp&tbnid=-6iMM1I3FvoyVM&vet=1&imgrefurl=https%3A%2F%2Fwww.wikihow.com%2FLearn-Morse-Code&docid=gBbtRGbI5Y7vFM&w=460&h=345&hl=en-US&source=sh%2Fx%2Fim%2Fm1%2F4&kgs=e93059792281d28f&shem=abme%2Ctrie"
            >
              Hint
            </a>
          </p>
        </section>

        <section className="morse-code-puzzle">
          {/* Replace 'video.mp4' with the actual video file path */}
          <iframe
            width="50%"
            height="50%"
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/WTx_L2r4JlA?si=VmMAAaomQ-2N1i6r"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="puzzle-hint">
            "Watch closely. The message is in the blinks. Decode the Morse code
            to find the hidden message."
          </p>

          <div className="message-input">
            <label htmlFor="message">Enter the Decoded Message:</label>
            <input
              type="text"
              id="message"
              name="message"
              placeholder="Enter the decoded message here"
              value={decodedMessage}
              onChange={(e) => setDecodedMessage(e.target.value)}
            />
            <button type="button" onClick={checkMessage}>
              Submit
            </button>
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
        </section>

        <div className="morse-code-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default MorseCodeVideoPage;
