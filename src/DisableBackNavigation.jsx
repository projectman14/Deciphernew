// DisableBackNavigation.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DisableBackNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Some browsers display a default message
    };

    const handlePopState = () => {
      // Ask for user confirmation before navigating back
      const userConfirmed = window.confirm(
        "Are you sure you want to leave this page? Your progress will be lost."
      );

      if (userConfirmed) {
        // Clear localStorage if the user confirms to go back
        localStorage.clear();

        // Redirect to an external URL or close the tab
        window.location.href = "https://www.youtube.com/shorts/3SxqXBuVZGw"; // Change this URL as needed
      } else {
        // Navigate forward to block back navigation
        navigate(1);
      }
    };

    // Push the current state to the history stack to prevent navigating back
    window.history.pushState(null, document.title, location.pathname);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, location]);

  return null;
};

export default DisableBackNavigation;
