import React from "react";
import { useNavigate } from "react-router-dom";

const RulesPage = () => {
  // const navigate = useNavigate();

  // const handleGoHome = () => {
  //   navigate("/"); // Navigate to the home page
  // };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Event Rules</h1>
        <h2 className="text-xl text-gray-600">
          Read and Understand the Rules Before Participating
        </h2>
      </header>

      <section className="mb-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to the Decipher Event! Before you dive into the challenges,
          please familiarize yourself with the following rules:
        </p>

        <ol className="list-decimal list-inside mt-4 text-gray-700">
          <li className="mb-2">
            <strong>Registration:</strong> All teams must register by completing
            the forms as soon as possible. Failure to register the team leader
            will result in disqualification.
          </li>
          <li className="mb-2">
            <strong>Team Size:</strong> Each team can have a maximum of 4
            members.
          </li>
          <li className="mb-2">
            <strong>Game Structure:</strong> The challenge consists of 12
            levels. Advancing through each level brings you closer to winning
            prizes.
          </li>
          <li className="mb-2">
            <strong>Submission:</strong> All answers must be submitted using the
            designated design interface.
          </li>
          <li className="mb-2">
            <strong>Determination of Winners:</strong> Winners will be decided
            based on the speed of completing all the challenges.
          </li>
          <li className="mb-2">
            <strong>Navigation Restrictions:</strong> Back navigation and
            refreshing the page are not allowed.
          </li>
          <li className="mb-2">
            <strong>Assistance:</strong> If you need help, feel free to ask the
            organizers or volunteers present.
          </li>
          <li className="mb-2">
            <strong>Leaving the Venue:</strong> If a level requires you to leave
            the event venue, you must return to the venue to continue the game.
          </li>
          <li className="mb-2">
            <strong>Disqualification:</strong> Violation of any of these rules
            will result in disqualification. The decision to disqualify any team
            rests solely with the Cipher team.
          </li>
        </ol>
      </section>

      {/* <section className="text-center">
        <button
          onClick={handleGoHome}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </section> */}
    </div>
  );
};

export default RulesPage;
