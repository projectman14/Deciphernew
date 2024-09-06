import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaderboardPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://decipher-fw2x.vercel.app/api/teams"
        );
        console.log(response);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-12 p-4 sm:p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-xl text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-10 tracking-wider">
        Leaderboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-base sm:text-lg text-white">
          <thead>
            <tr className="bg-blue-700 text-white uppercase text-xs sm:text-sm tracking-wider">
              <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-300">
                Rank
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-300">
                Team Name
              </th>
              <th className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-300">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={index}
                className={`${
                  index < 5
                    ? "bg-yellow-200 text-black font-bold"
                    : index % 2 === 0
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 text-gray-800"
                } hover:bg-gray-300 transition-all duration-300 cursor-pointer`}
              >
                <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-400">
                  {index + 1}
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-400">
                  {team.team}
                </td>
                <td className="py-2 px-2 sm:py-3 sm:px-4 border-b border-gray-400">
                  {team.currentTask}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
