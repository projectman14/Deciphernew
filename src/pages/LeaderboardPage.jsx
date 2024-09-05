import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaderboardPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://decipher-fw2x.vercel.app/api/teams"
        ); // Adjust the URL as needed
        console.log(response);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Leaderboard</h1>
      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-4 border-b border-gray-200">Rank</th>
            <th className="py-3 px-4 border-b border-gray-200">Team Name</th>
            <th className="py-3 px-4 border-b border-gray-200">Score</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
              } hover:bg-gray-200 cursor-pointer`}
            >
              <td className="py-3 px-4 border-b border-gray-200">
                {index + 1}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {team.team}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {team.currentTask}
              </td>{" "}
              {/* Display score as currentTask */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
