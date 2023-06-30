import { Routes, Route } from "react-router-dom";
import LeftNavbar from "./UI Components/LeftNavbar";
import NewTaskPanel from "./features/tasks/TaskPanel";
import NewJournalPanel from "./UI Components/JournalPanel";
import CreateTaskPanel from "./features/tasks/CreateTaskModal";
import UpdateTaskPanel from "./features/tasks/UpdateTaskPanel";
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={<LeftNavbar />} />
        <Route path="/sharlenetest" element={<NewTaskPanel />} />
        <Route path="/junyitest" element={<NewJournalPanel />} />
        <Route path="/sharleneupdate" element={<UpdateTaskPanel />} />
        <Route path="/sharlenecreate" element={<CreateTaskPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
