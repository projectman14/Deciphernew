import React from "react";
import { useNavigate } from "react-router-dom";

const RulesPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Event Rules</h1>
        <h2 className="text-xl text-gray-600">Read and Understand the Rules Before Participating</h2>
      </header>

      <section className="mb-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to the Decipher Event! Before you dive into the challenges,
          please familiarize yourself with the following rules:
        </p>

        <ol className="list-decimal list-inside mt-4 text-gray-700">
          <li className="mb-2">
            <strong>Eligibility:</strong> Participants must be registered and
            have received a confirmation email to join the event.
          </li>
          <li className="mb-2">
            <strong>Integrity:</strong> All answers and solutions must be the
            participant's own work. Cheating or using unauthorized resources is
            prohibited.
          </li>
          <li className="mb-2">
            <strong>Submission:</strong> Answers must be submitted through the
            designated interface. Submissions will be evaluated for correctness
            and completeness.
          </li>
          <li className="mb-2">
            <strong>Timing:</strong> The event runs from [Start Date] to [End
            Date]. Ensure you complete all challenges within this timeframe.
          </li>
          <li className="mb-2">
            <strong>Communication:</strong> Any issues or queries should be
            directed to the event organizers through the provided contact
            details.
          </li>
          <li className="mb-2">
            <strong>Respect:</strong> Treat all participants and organizers with
            respect. Harassment or inappropriate behavior will not be tolerated.
          </li>
          <li className="mb-2">
            <strong>Prizes:</strong> Prizes will be awarded based on the
            accuracy and speed of challenge completions. Winners will be
            announced after the event ends.
          </li>
          <li className="mb-2">
            <strong>Disqualification:</strong> Violation of any rules may result
            in disqualification from the event. Ensure you follow all guidelines
            to avoid any issues.
          </li>
        </ol>
      </section>

      <section className="text-center">
        <button
          onClick={handleGoHome}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </section>
    </div>
  );
};

export default RulesPage;
