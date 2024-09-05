import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import image from "../../public/registrationform-1.jpg";

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
        navigate("/decipher-page");
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
        <h1 className="text-2xl font-bold underline">Register Your Team</h1>
        <h2 className="text-xl">Join the Decipher Event!</h2>
        <div>
          <img src={image} alt="" className="mx-auto mt-4" />
        </div>
      </header>

      <section className="mt-5">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="teamName" className="block font-bold mb-1">
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
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white border-none py-2 px-4 text-base cursor-pointer ${
              isSubmitting ? "bg-gray-500" : "hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {feedback && <p className="mt-3 text-red-500">{feedback}</p>}
      </section>

      {/* <div className="text-center mt-96">
        <Footer />
      </div> */}
    </div>
  );
};

export default RegisterTeamPage;