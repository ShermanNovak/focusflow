import NewJournalPanel from "./components/JournalPanel";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreateTaskPanel from "./features/tasks/CreateTaskPanel";
import UpdateTaskPanel from "./features/tasks/UpdateTaskPanel";
import LeftNavbar from "./components/LeftNavbar";

import { PanelContext } from "./context/PanelContext";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

function App() {
  const panelContext = useContext(PanelContext);

  return (
    <div className="App flex">
      <LeftNavbar />
      <Routes>
        <Route path="/junyitest" element={<NewJournalPanel />} />
        <Route path="/updatetask" element={<UpdateTaskPanel />} />
        <Route path="/createtask" element={<CreateTaskPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position="top-right" />
      {panelContext.showCreateTaskPanel && <CreateTaskPanel />}
      {panelContext.showUpdateTaskPanel && <UpdateTaskPanel />}
    </div>
  );
}

export default App;
