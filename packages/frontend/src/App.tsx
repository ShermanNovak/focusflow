import React from "react";
import { Routes, Route } from "react-router-dom";
import LeftNavbar from "./UI Components/LeftNavbar";
import NewTaskPanel from "./features/tasks/TaskPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={<LeftNavbar />} />
        <Route path="/sharlenetest" element={<NewTaskPanel />} />
      </Routes>
    </div>
  );
}

export default App;
