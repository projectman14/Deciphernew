import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DisableBackNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBeforeUnload = useCallback((event) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  const handlePopState = useCallback(() => {
    const userConfirmed = window.confirm(
      "Are you sure you want to leave this page? Your progress will be lost."
    );

    if (userConfirmed) {
      localStorage.clear();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.location.replace("https://www.youtube.com/shorts/3SxqXBuVZGw");
    } else {
      navigate(location.pathname, { replace: true });
    }
  }, [navigate, location.pathname, handleBeforeUnload]);

  useEffect(() => {
    window.history.pushState(null, document.title, location.pathname);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname, handlePopState, handleBeforeUnload]);

  return null;
};

export default DisableBackNavigation;