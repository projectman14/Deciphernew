import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import CVEQUEST from "../../public/documents/CVE-question-protectedlatest.pdf";

const CVQuestions = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );

  const navigate = useNavigate();
  const correctAnswer = "I invested for the memes";

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the CVQuestion.");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 11,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/cF8kP2nWjRzM");
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

  if (lastTaskState >= 10) {
    return (
      <div className="font-sans p-5 bg-yellow-50 text-center max-w-3xl mx-auto">
        <header className="bg-pink-700 text-white p-5 rounded-lg mb-5">
          <h1>Documentation is the Key 🙃</h1>
        </header>

        <section className="bg-white p-5 rounded-lg mb-5 shadow-md">
          <div className="object-contain">
            <h3>Puzzle #11</h3>
          </div>
          <p className="text-lg text-gray-700">
            "All versions of package dojo are vulnerable to prototype pollution
            via setObject function"
          </p>
        </section>

        <section className="bg-white p-5 rounded-lg mb-5 shadow-md">
          <div className="mb-5">
            <a href={CVEQUEST} download className="text-blue-500 underline">
              Download PDF
            </a>
          </div>
          <p className="text-pink-700 font-bold text-lg mb-5">
            Downloading the pdf might help
          </p>
          <div className="mt-5">
            <label htmlFor="cipherInput" className="text-lg mr-2">
              Enter the name:
            </label>
            <input
              type="text"
              id="cipherInput"
              name="cipherInput"
              placeholder="Your answer"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="p-2 text-lg rounded-md border border-gray-300 mr-2"
            />
            <button
              type="button"
              onClick={checkAnswer}
              className="p-2 text-lg rounded-md bg-pink-700 text-white hover:bg-pink-800"
            >
              Submit
            </button>
          </div>

          {feedback && <p className="text-lg text-red-600 mt-4">{feedback}</p>}
        </section>

        {/* <div className="bg-pink-700 text-white p-4 rounded-lg mt-36"> */}
        <Footer />
        {/* </div> */}
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default CVQuestions;
