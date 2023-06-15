import { Routes, Route } from "react-router-dom";
import TaskPanel from "./features/tasks/TaskPanel";
import TaskModal from './features/tasks/TaskModal';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharlenetest" element={<TaskPanel />} />
        <Route path="/sharlenetestmodal" element={<TaskModal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
