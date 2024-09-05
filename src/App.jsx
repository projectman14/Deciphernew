import "./App.css";
import { DecipherPage } from "./pages/DecipherPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocationHuntPage from "./pages/LocationHuntPage";
import MorseCodeVideoPage from "./pages/MorseCodeVideoPage ";
import BinaryIPAddressPage from "./pages/BinaryIPAddressPage";
import DancingWithFlagsPage from "./pages/DancingWithFlagsPage";
import CaesarCipherPage from "./pages/CaesarCipherPage";
import DistortedImagePage from "./pages/DistortedImagePage";
import GoogleStreetViewPage from "./pages/GoogleStreetViewPage";
import GoogleLensPage from "./pages/GoogleLensPage";
import FinalAnswerPage from "./pages/FinalAnswerPage";
import RulesPage from "./pages/RulesPage";

import Brainfuck from "./pages/Brainfuck";

import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import RegisterTeamPage from "./pages/RegisterTeamPage.jsx";
import DisableBackNavigation from "./DisableBackNavigation.jsx";
import CVQuestions from "./pages/CVQuestions.jsx";
import { useEffect } from "react";

// import OptionalQuestion from "./pages/OptionalQuestion";

// import "./pages/BinaryIPAddressPage.css";
// import "./pages/CaesarCipherPage.css";
// import "./pages/CaesarCipherPage.css";
// import "./pages/DancingWithFlagsPage.css";
// import "./pages/DistortedImagePage.css";
// import "./pages/FinalAnswerPage.css";
// import "./pages/GoogleLensPage.css";
// import "./pages/GoogleStreetViewPage.css";
// import "./pages/LeaderboardPage.css";
// import "./pages/LLMChatbotPage.css";
// import "./pages/LocationHuntPage.css";
// import "./pages/MorseCodeVideoPage.css";
// import "./pages/CaesarCipherPage.css";
// import "./pages/RegisterTeamPage.css";
// import "./pages/RulesPage.css";

function App() {
  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };

    // Unmount the window.onbeforeunload event
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <>
      {/* <DisableBackNavigation /> */}
      <BrowserRouter>
        <DisableBackNavigation />
        <Routes>
          <Route path="/hG8pR4nKxZcJ" element={<DecipherPage />} />
          <Route path="/mL2wX1oTtQdE" element={<LocationHuntPage />} />
          {/* <Route path="/llm-chatbot" element={<LLMChatbotPage />} /> */}
          <Route path="/vN7sJpR6aKqB" element={<BinaryIPAddressPage />} />
          <Route
            path="/vN7sJpR6aKqfX9kL3uHcWyQ"
            element={<CaesarCipherPage />}
          />
          <Route path="/zT5vB8rDgWmN" element={<DistortedImagePage />} />
          <Route path="/qR2jF4yLpNzX" element={<GoogleLensPage />} />
          <Route path="/wM6oK8tJrBfV" element={<GoogleStreetViewPage />} />
          <Route path="/dS3pL9xCzQyG" element={<DancingWithFlagsPage />} />{" "}
          <Route path="/vX7rT1wLqJbN" element={<MorseCodeVideoPage />} />
          <Route path="/hL5qR9oTtZxY" element={<CVQuestions />} />
          <Route path="/cF8kP2nWjRzM" element={<Brainfuck />} />
          {/* <Route path="/optional-question" element={<OptionalQuestion />} /> */}
          <Route path="/gJ2vX6pR3BfM" element={<FinalAnswerPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/team/leaderboard" element={<LeaderboardPage />} />
          <Route path="/" element={<RegisterTeamPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
