import { useState } from 'react';
import CreateTaskPanel from "../features/tasks/CreateTaskModal";
import UpdateTaskPanel from "../features/tasks/UpdateTaskPanel";
export default function HomePage() {
    const [showCreateTaskPanel, setShowCreateTaskPanel] = useState(false);
    const [showUpdateTaskPanel, setShowUpdateTaskPanel] = useState(false);

    return (
      <>
        {showCreateTaskPanel && <CreateTaskPanel />}
        {showUpdateTaskPanel && <UpdateTaskPanel />}
      </>
    );
  }
  