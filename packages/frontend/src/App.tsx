import { Routes, Route } from "react-router-dom";
import NewJournalPanel from "./components/JournalPanel";
import CreateTaskPanel from "./features/tasks/CreateTaskPanel";
import UpdateTaskPanel from "./features/tasks/UpdateTaskPanel";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import Spotify from "./pages/Spotify"
import SpotifyModal from "./features/spotify/SpotifyModal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/spotify/callback" element={<Spotify />} />
        <Route path="/junyitest" element={<NewJournalPanel />} />
        <Route path="/updatetask" element={<UpdateTaskPanel />} />
        <Route path="/createtask" element={<CreateTaskPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
