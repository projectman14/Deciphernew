import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import image2 from "/satoshinaka.jpg";

const LocationHuntPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  );
  const navigate = useNavigate();

  const correctLocation = "Tokyo Tower";

  const checkLocation = async () => {
    if (selectedLocation === correctLocation) {
      setFeedback(
        "Correct! You've followed Satoshi's trail to the right location."
      );

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 2,
            team: localStorage.getItem("teamName"),
          }
        );

        const { currentTask, lastTask } = response.data;

        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        navigate("/vN7sJpR6aKqB");
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

  if (lastTaskState >= 1) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-teal-50 text-center">
        <header className="bg-teal-700 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">
            Location Hunt: Follow the Trail
          </h1>
          <h2 className="text-xl mt-2">
            Can you trace Satoshi's elusive path?
          </h2>
        </header>

        <div className="bg-white p-6 rounded-lg mb-6 shadow-md">
          <div>
            <img src={image2} alt="" className="mx-auto" />
          </div>
          <p className="text-lg mt-4">
            Known for anonymity & intractability, yet left a trail of cues
            behind. <br /> Find his history there, to make your history here.
          </p>
          <a
            className="text-blue-500 hover:underline mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Don't click on it. Our developers just wanted to be funny. 🙄
          </a>
        </div>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Puzzle #2</h3>
          <p className="text-xl font-light text-teal-700 mb-4">
            "TO FIND: <span className="font-bold">A Place.</span> <br />
            <b>Hint:</b> Relates Mr. Nakamoto to the world. A peaceful, yet
            bombastic place.."
          </p>

          <div className="mt-6">
            <label htmlFor="location" className="text-lg font-semibold mr-4">
              Choose the Location:
            </label>
            <select
              id="location"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md mr-4"
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

export default LocationHuntPage;
