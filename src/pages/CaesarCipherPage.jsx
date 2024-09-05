import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import poem from "/poem.gif";

const CaesarCipherPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );

  const navigate = useNavigate();

  const correctAnswer = import.meta.env.VITE_CORRECT_ANSWER_CAESAR;

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the Caesar cipher.");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 4,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/distorted-image");
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

  if (lastTaskState >= 3) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-yellow-50 text-center">
        <header className="bg-pink-800 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Poetic Cipher: Really?</h1>
        </header>

        <section className="bg-white p-6 rounded-lg mb-6 shadow-md">
          <div className="flex flex-col items-center">
            <img className="w-3/4 object-contain" src={poem} alt="Poem Image" />
            <h3 className="text-2xl font-semibold mt-4">Puzzle #4</h3>
          </div>
          <p className="text-lg mt-4">
            "With sacrifice before the rising morn Vows have I made by fruitless
            hope inspired; And from the infernal Gods, 'mid shades forlorn Of
            night, my slaughtered Lord have I required: Celestial pity I again
            implore;— Restore him to my sight—great Jove, restore!"
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-bold text-pink-800 mb-4">
            गूगल आंकड़े दे सकता है, ज्ञान नहीं; but Google FTW!
          </p>
          <div className="mt-6">
            <label
              htmlFor="cipherInput"
              className="text-lg font-semibold mr-4"
            >
              Enter the name:
            </label>
            <input
              type="text"
              id="cipherInput"
              name="cipherInput"
              placeholder="Your answer"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            />
            <button
              type="button"
              onClick={checkAnswer}
              className="px-4 py-2 bg-pink-800 text-white rounded-md hover:bg-pink-900 transition"
            >
              Submit
            </button>
          </div>

          {feedback && (
            <p className="text-red-600 font-semibold mt-4">{feedback}</p>
          )}
        </section>

        <div className="mt-12">
          <Footer />
        </div>
      </div>
    );
  } else {
    return <p>You have not completed the previous question</p>;
  }
};

export default CaesarCipherPage;
