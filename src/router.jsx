import React from "react";
import { HashRouter as Router,Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Login from "./login"
import MessagePage from "./message";
import EventHandler from "./components/eventHandler";
import InstallCheck from "./components/install";


function RouterLink() {
    return (
        <Router>
            <InstallCheck />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login/:id" element={<Login />} />
                <Route path="/message" element={<MessagePage />}/>

            </Routes>
            <EventHandler />
        </Router>

    );
}

export default RouterLink;

