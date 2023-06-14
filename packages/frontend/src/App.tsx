import { Routes, Route } from "react-router-dom";
import TaskPanel from "./features/tasks/TaskPanel";
import TaskModal from './features/tasks/TaskModal';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharlenetest" element={<TaskPanel />} />
        <Route path="/sharlenetestmodal" element={<TaskModal />} />
      </Routes>
    </div>
  );
}

export default App;
