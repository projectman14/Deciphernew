import { useState } from "react";
import "./LocationHuntPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Footer from "./Footer";
import image2 from "/satoshinaka.jpg";

const LocationHuntPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate();

  const correctLocation = "Tokyo Tower"; // Replace with the actual correct location

  const checkLocation = async () => {
    if (selectedLocation === correctLocation) {
      setFeedback(
        "Correct! You've followed Satoshi's trail to the right location."
      );

      // You can add code here to navigate to the next page or reveal more content

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 2, // Assuming the task number is 2
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );
        console.log("Pssed");
        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        // Navigate to the next page after successfully submitting the task
        navigate("/binary-ip-address");
      } catch (error) {
        setFeedback(
          "There was an error submitting the task. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback(
        "Incorrect. Remember, Satoshi was known for his subtlety. Try again!"
      );
    }
  };

  // Render content based on the current task state
  if (lastTaskState >= 1) {
    return (
      <div className="location-hunt-container">
        <header className="location-hunt-header">
          <h1>Location Hunt: Follow the Trail</h1>
          <h2>Can you trace Satoshi's elusive path?</h2>
        </header>

        <div className="location-hunt-intro">
          <div>
            <img src={image2} alt="" />
          </div>
          <p>
            Known for anonymity & intractability, yet left a trail of cues
            behind.
            <br />
            Find his history there, to make your history here.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Don't click on it. Our developers just wanted to be funny. 🙄
          </a>
        </div>

        <section className="location-hunt-puzzle">
          <h3>Puzzle #2</h3>
          <p className="puzzle-hint">
            "TO FIND: <span id="apla">A Place.</span>
            <br />
            Hint: Relates Mr. Nakamoto to the world. A peaceful, yet bombastic
            place.."
          </p>

          <div className="location-select">
            <label htmlFor="location">Choose the Location:</label>
            <select
              id="location"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select a location</option>
              <option value="Silicon Valley">Silicon Valley</option>
              <option value="Blockchain Park">Blockchain Park</option>
              <option value="London Bridge">London Bridge</option>
              <option value="Tokyo Tower">Tokyo Tower</option>
              <option value="venice">Venice</option>
              <option value="OHIO">ohio</option>
              <option value="amsterdam">Amsterdam</option>
              <option value="india">India</option>
              <option value="mittal kallej">Mittal Kalej</option>
              <option value="mittal kallej">Shanghai</option>
              <option value="mittal kallej">Singapore</option>
            </select>
            <button type="button" onClick={checkLocation}>
              Submit
            </button>
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
        </section>

        <div className="location-hunt-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default LocationHuntPage;
