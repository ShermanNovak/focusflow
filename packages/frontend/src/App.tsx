import React from "react";
import { Routes, Route } from "react-router-dom";
import Modal from "./UI Components/Modal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </div>
  );
}

export default App;
