import React from "react";
import { HashRouter as Router,Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Login from "./login"
import MessagePage from "./message";


function RouterLink() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login/:id" element={<Login />} />
                <Route path="/message" element={<MessagePage />}/>

            </Routes>
        </Router>

    );
}

export default RouterLink;

