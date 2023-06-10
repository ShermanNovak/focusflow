import React from "react";
import { Routes, Route } from "react-router-dom";
import NewTaskPanel from "./features/tasks/NewTaskPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharlenetest" element={<NewTaskPanel />} />
      </Routes>
    </div>
  );
}

export default App;
