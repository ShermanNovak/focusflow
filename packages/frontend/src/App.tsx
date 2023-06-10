import React from "react";
import { Routes, Route } from "react-router-dom";
import RightPanel from "./UI Components/RightPanel"
import LeftNavbar from "./UI Components/LeftNavbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharlenetest" element={<RightPanel />} />
        <Route path ="/" element={<LeftNavbar />} />
      </Routes>
    </div>
  );
}

export default App;
