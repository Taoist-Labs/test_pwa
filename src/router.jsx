import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MessagePage from "./message";

export default function RouterLink() {
  return (
    <Router>
      <Routes>
        <Route path="/message" element={<MessagePage />} index />
      </Routes>
    </Router>
  );
}
