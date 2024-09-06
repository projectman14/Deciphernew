import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";


const Book = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctLocation = "specialweddingchocolate";

  const checkLocation = async () => {
    if (selectedLocation === correctLocation) {
      setFeedback(
        "Correct! You've followed Satoshi's trail to the right location."
      );

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 13,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;

        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        navigate("/gJ2vX6pR3BfM");
      } catch (error) {
        setFeedback(
          "There was an error submitting the task. Please try again later."
        );
      }
    } else {
      setFeedback(
        "Incorrect. Remember, Satoshi was known for his subtlety. Try again!"
      );
    }
  };

  if (lastTaskState >= 12) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-teal-50 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">
            Why should I traverse this book? 
          </h1>
          <h2 className="text-xl mt-2">
            Atleast give me the name!!
          </h2>
        </header>

        <div className="bg-white p-6 rounded-lg mb-6 shadow-md">
          
          <p className="text-lg mt-4">
          Book: 9781503987685 <br />
            92-33-8 <br />
            60-15-13 <br />
            71-4-7 
          </p>
          
        </div>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Puzzle #13</h3>
          <p className="text-xl font-light text-teal-700 mb-4">
            <b>Hint:</b> Maybe the order is P-L-W, and submit the answer without spaces
          </p>

          <div className="mt-6">
            <label htmlFor="location" className="text-lg font-semibold mr-4">
              Answer:
            </label>
            <input
              id="location"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            />
            <button
              type="button"
              onClick={checkLocation}
              className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-900 transition"
            >
              Submit
            </button>
          </div>

          {feedback && (
            <p className="text-red-600 font-semibold mt-4">{feedback}</p>
          )}
        </section>

        <div className="mt-12">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <p>You have not completed the previous question</p>;
  }
};

export default Book;
