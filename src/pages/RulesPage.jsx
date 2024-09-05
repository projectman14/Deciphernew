import React from "react";
import { useNavigate } from "react-router-dom";
import "./RulesPage.css"; // Ensure you create this CSS file

const RulesPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="rules-container">
      <header className="rules-header">
        <h1>Event Rules</h1>
        <h2>Read and Understand the Rules Before Participating</h2>
      </header>

      <section className="rules-content">
        <p>
          Welcome to the Decipher Event! Before you dive into the challenges,
          please familiarize yourself with the following rules:
        </p>

        <ol>
          <li>
            <strong>Eligibility:</strong> Participants must be registered and
            have received a confirmation email to join the event.
          </li>
          <li>
            <strong>Integrity:</strong> All answers and solutions must be the
            participant's own work. Cheating or using unauthorized resources is
            prohibited.
          </li>
          <li>
            <strong>Submission:</strong> Answers must be submitted through the
            designated interface. Submissions will be evaluated for correctness
            and completeness.
          </li>
          <li>
            <strong>Timing:</strong> The event runs from [Start Date] to [End
            Date]. Ensure you complete all challenges within this timeframe.
          </li>
          <li>
            <strong>Communication:</strong> Any issues or queries should be
            directed to the event organizers through the provided contact
            details.
          </li>
          <li>
            <strong>Respect:</strong> Treat all participants and organizers with
            respect. Harassment or inappropriate behavior will not be tolerated.
          </li>
          <li>
            <strong>Prizes:</strong> Prizes will be awarded based on the
            accuracy and speed of challenge completions. Winners will be
            announced after the event ends.
          </li>
          <li>
            <strong>Disqualification:</strong> Violation of any rules may result
            in disqualification from the event. Ensure you follow all guidelines
            to avoid any issues.
          </li>
        </ol>
      </section>

      <section className="rules-footer">
        <button onClick={handleGoHome}>Back to Home</button>
      </section>
    </div>
  );
};

export default RulesPage;
