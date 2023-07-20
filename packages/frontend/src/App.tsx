import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LeftNavbar from "./components/LeftNavbar";
import CreateTaskPanel from "./features/tasks/CreateTaskPanel";
import UpdateTaskPanel from "./features/tasks/UpdateTaskPanel";
import SessionPanel from "./features/sessions/SessionPanel";
import CreateJEntryPanel from "./features/journal/CreateJEntryPanel";
import UpdateJEntryPanel from "./features/journal/UpdateJEntryPanel";

import { PanelContext } from "./context/PanelContext";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Spotify from "./pages/Spotify"
import SpotifyModal from "./features/spotify/SpotifyModal";

function App() {
  const panelContext = useContext(PanelContext);

  return (
    <div className="flex">
      <LeftNavbar />
      <Routes>
        <Route path="/spotify/callback" element={<Spotify />} />
        <Route path="/createjentry" element={<CreateJEntryPanel />}/>
        <Route path="/updatejentry" element={<UpdateJEntryPanel />} />
        <Route path="/updatetask" element={<UpdateTaskPanel />} />
        <Route path="/createtask" element={<CreateTaskPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position="top-right" />

      {panelContext.showCreateTaskPanel && <CreateTaskPanel />}
      {panelContext.showUpdateTaskPanel && <UpdateTaskPanel />}
      {panelContext.showSessionPanel && <SessionPanel />}
      {panelContext.showCreateJEntryPanel && <CreateJEntryPanel />}
      {panelContext.showUpdateJEntryPanel && <UpdateJEntryPanel />}
    </div>
  );
}

export default App;
