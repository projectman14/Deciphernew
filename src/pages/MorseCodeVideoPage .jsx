import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Footer from "./Footer";

const MorseCodeVideoPage = () => {
  const [decodedMessage, setDecodedMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctMessage = "kernel"; // Replace with the actual Morse code message decoded

  const checkMessage = async () => {
    if (decodedMessage.toLowerCase() === correctMessage) {
      setFeedback("Correct! You've deciphered the hidden Morse code message.");

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 9, // Assuming the task number is 9
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        // Navigate to the next page after successfully submitting the task
        navigate("/hL5qR9oTtZxY");
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

  if (lastTaskState >= 8) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 text-center">
        <header className="bg-gray-800 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">
            Morse Code Video: Hidden in Plain Sight
          </h1>
          <h2 className="text-xl mt-2">Can you decode the message?</h2>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Puzzle #9</h3>
          <p className="text-lg text-gray-700">
            In the silent ballet of coded light, observe the pattern within the
            night. <br /> With careful gaze and patient ear, the message hidden
            will soon appear.
            <br />
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.wikihow.com%2Fimages%2Fthumb%2F1%2F17%2FLearn-Morse-Code-Step-2-Version-4.jpg%2Fv4-460px-Learn-Morse-Code-Step-2-Version-4.jpg.webp&tbnid=-6iMM1I3FvoyVM&vet=1&imgrefurl=https%3A%2F%2Fwww.wikihow.com%2FLearn-Morse-Code&docid=gBbtRGbI5Y7vFM&w=460&h=345&hl=en-US&source=sh%2Fx%2Fim%2Fm1%2F4&kgs=e93059792281d28f&shem=abme%2Ctrie"
            >
              Hint
            </a>
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <iframe
            className="w-full  rounded-lg shadow-md"
            src="https://www.youtube.com/embed/WTx_L2r4JlA?si=VmMAAaomQ-2N1i6r"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="text-lg font-bold text-gray-800 mt-4 mb-6">
            "Watch closely. The message is in the blinks. Decode the Morse code
            to find the hidden message."
          </p>

          <div className="mt-6">
            <label htmlFor="message" className="text-lg font-semibold mr-4">
              Enter the Decoded Message:
            </label>
            <input
              type="text"
              id="message"
              name="message"
              placeholder="Enter the decoded message here"
              value={decodedMessage}
              onChange={(e) => setDecodedMessage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            />
            <button
              type="button"
              onClick={checkMessage}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </div>

          {feedback && (
            <p className="text-red-600 font-semibold mt-4">{feedback}</p>
          )}
        </section>

        <div className="mt-8">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <p className="text-center text-lg">
        You have not completed the previous question.
      </p>
    );
  }
};

export default MorseCodeVideoPage;
