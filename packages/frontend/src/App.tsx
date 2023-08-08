import NewJournalPanel from "./components/JournalPanel";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LeftNavbar from "./components/LeftNavbar";
import CreateTaskPanel from "./features/tasks/CreateTaskPanel";
import UpdateTaskPanel from "./features/tasks/UpdateTaskPanel";
import SessionPanel from "./features/sessions/SessionPanel";


import { PanelContext } from "./context/PanelContext";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {user, isAuthenticated} = useAuth0();
  const panelContext = useContext(PanelContext);

  if (isAuthenticated) {
    return (
      <div className="flex">
        <LeftNavbar />
        <Routes>
          <Route path="/junyitest" element={<NewJournalPanel />} />
          <Route path="/updatetask" element={<UpdateTaskPanel />} />
          <Route path="/createtask" element={<CreateTaskPanel />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Toaster position="top-right" />

        {panelContext.showCreateTaskPanel && <CreateTaskPanel />}
        {panelContext.showUpdateTaskPanel && <UpdateTaskPanel />}
        {panelContext.showSessionPanel && <SessionPanel />}
      </div>
    );
  } else {
    return (
      <div className="block">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;