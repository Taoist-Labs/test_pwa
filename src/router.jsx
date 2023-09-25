import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import MessagePage from "./message";
import EventHandler from "./components/eventHandler";
import InstallCheck from "./components/install";

function RouterLink() {
  const [isInstalled, setIsInstalled] = useState(true);

  useEffect(() => {
    if (
      window.navigator?.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      console.log("isInstalled: true. Already in standalone mode");
      setIsInstalled(true);
    } else {
        console.log("isInstalled: false");
        setIsInstalled(false);
    }
    
  }, []);
    
  return (
    <Router>
      {!isInstalled && <InstallCheck />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/message" element={<MessagePage />} />
      </Routes>
      <EventHandler />
    </Router>
  );
}

export default RouterLink;
