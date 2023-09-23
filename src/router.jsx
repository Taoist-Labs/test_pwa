import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Login from "./login"
import MessagePage from "./message";


function RouterLink() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
             <Route path="/home" element={<Home />} />
             <Route path="/login/:id" element={<Login />} />
            <Route path="/message" element={<MessagePage />}/>

        </Routes>
    );
}

export default RouterLink;

