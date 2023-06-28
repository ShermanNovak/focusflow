import React from "react";
import { Routes, Route } from "react-router-dom";
import LeftNavbar from "./UI Components/LeftNavbar";
import NewTaskPanel from "./features/tasks/TaskPanel";
import NewJournalPanel from "./UI Components/JournalPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={<LeftNavbar />} />
        <Route path="/sharlenetest" element={<NewTaskPanel />} />
        <Route path="/junyitest" element={<NewJournalPanel />} />
      </Routes>
    </div>
  );
}

export default App;
