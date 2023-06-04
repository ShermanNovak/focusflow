import React from "react";
import { Routes, Route } from "react-router-dom";
import RightPanel from "./UI Components/RightPanel"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharlenetest" element={<RightPanel />} />
      </Routes>
    </div>
  );
}

export default App;
