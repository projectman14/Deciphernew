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
import Enigma from "./pages/Enigma.jsx";
import Book from "./pages/Book.jsx";

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
          <Route path="/WbWjvFhfksfe" element={<Enigma />} />{" "}
          <Route path="/vX7rT1wLqJbN" element={<MorseCodeVideoPage />} />
          <Route path="/hL5qR9oTtZxY" element={<CVQuestions />} />
          <Route path="/cF8kP2nWjRzM" element={<Brainfuck />} />
          {/* <Route path="/optional-question" element={<OptionalQuestion />} /> */}
          <Route path="/boKachoDa" element={<Book />} />
          <Route path="/gJ2vX6pR3BfM" element={<FinalAnswerPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/team/leaderboard-hgfgfgjguseaehfbhebvfvvvehvbjiwht" element={<LeaderboardPage />} />
          <Route path="/" element={<RegisterTeamPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
