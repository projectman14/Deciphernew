import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import image from "../../public/registrationform-1.jpg";
import { Rule } from "postcss";
import RulesPage from "./RulesPage";

const RegisterTeamPage = () => {
  const [teamName, setTeamName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams`,
        {
          teamName,
        }
      );
      console.log(response.status);
      if (response.status === 201) {
        localStorage.setItem("teamName", teamName);
        localStorage.setItem("lastTask", 0);

        setFeedback(
          "Registration successful! Please wait for further instructions."
        );
        navigate("/hG8pR4nKxZcJ");
        setTeamName("");
      } else {
        setFeedback("Registration failed. Please try again.");
      }
    } catch (error) {
      setFeedback(`${error.response.data.error}`);
      console.error("Error registering team:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <header className="text-center mb-5">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h1 className="text-3xl font-bold underline text-blue-600">
            Register Your Team
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mt-2">
            Join the Decipher Event!
          </h2>
          <div>
            <img
              src={image}
              alt="Team Registration"
              className="mx-auto mt-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </header>

      <section className="mt-5 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="teamName"
              className="block font-bold mb-1 text-gray-600"
            >
              Team Name:
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-base font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "hover:from-blue-600 hover:to-purple-700"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {feedback && (
          <p className="mt-3 text-center text-red-500 font-medium">
            {feedback}
          </p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default RegisterTeamPage;
