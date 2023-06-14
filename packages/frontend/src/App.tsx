import { Routes, Route } from "react-router-dom";
import TaskPanel from "./features/tasks/TaskPanel";
import TaskModal from './features/tasks/TaskModal';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharlenetest" element={<TaskPanel />} />
        <Route path="/sharlenetestmodal" element={<TaskModal />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
