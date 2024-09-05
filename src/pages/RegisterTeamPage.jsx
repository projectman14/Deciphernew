import React, { useState } from "react";
import axios from "axios";
import "../styles/RegisterTeamPage.css"; // Ensure you create this CSS file
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
        // Set localStorage values
        localStorage.setItem("teamName", teamName);
        localStorage.setItem("lastTask", 0);

        setFeedback(
          "Registration successful! Please wait for further instructions."
        );
        navigate("/decipher-page");
        // Optionally, redirect or clear form
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
    <div className="register-team-container">
      <header className="register-team-header">
        <h1>Register Your Team</h1>
        <h2>Join the Decipher Event!</h2>
        <dir>
          <img src={image} alt="" />
        </dir>
      </header>

      <section className="register-team-form">
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      {/* <div className="register-team-footer">
        <Footer></Footer>
      </div> */}
    </div>
  );
};

export default RegisterTeamPage;
