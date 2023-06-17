import { Routes, Route } from "react-router-dom";
import CreateTaskPanel from "./features/tasks/CreateTaskModal";
import UpdateTaskPanel from "./features/tasks/UpdateTaskPanel";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sharleneupdate" element={<UpdateTaskPanel />} />
        <Route path="/sharlenecreate" element={<CreateTaskPanel />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
