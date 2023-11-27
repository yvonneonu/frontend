// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersInfo from "./components/UsersInfo";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UsersInfo />} />
        <Route path="/user/:userId" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
