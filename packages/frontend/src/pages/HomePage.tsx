import { useState } from 'react';
import TaskModal from '../features/tasks/TaskModal';
import TaskPanel from '../features/tasks/TaskPanel';

export default function HomePage() {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showTaskPanel, setShowTaskPanel] = useState(false);

    return (
      <>
        {showTaskModal && <TaskModal />}
        {showTaskPanel && <TaskPanel />}
      </>
    );
  }
  