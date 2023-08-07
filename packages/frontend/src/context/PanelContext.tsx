import { useState, createContext } from "react";

export const PanelContext = createContext({
  showCreateTaskPanel: false,
  showUpdateTaskPanel: false,
  showSessionPanel: false,
  showCreateEventPanel: false,
  showUpdateEventPanel: false,
  showCreateJEntryPanel: false,
  showUpdateJEntryPanel: false,
  openCreateTaskPanel: () => {},
  closeCreateTaskPanel: () => {},
  openUpdateTaskPanel: () => {},
  closeUpdateTaskPanel: () => {},
  openCreateEventPanel: () => {},
  closeCreateEventPanel: () => {},
  openUpdateEventPanel: () => {},
  closeUpdateEventPanel: () => {},
  openSessionPanel: () => {},
  closeSessionPanel: () => {},
  openCreateJEntryPanel: () => {},
  closeCreateJEntryPanel: () => {},
  openUpdateJEntryPanel: () => {},
  closeUpdateJEntryPanel: () => {},
});

export function PanelContextProvider(props: any) {
  const [showCreateTaskPanel, setShowCreateTaskPanel] = useState(false);
  const [showUpdateTaskPanel, setShowUpdateTaskPanel] = useState(false);
  const [showSessionPanel, setShowSessionPanel] = useState(false);
  const [showCreateJEntryPanel, setShowCreateJEntryPanel] = useState(false);
  const [showUpdateJEntryPanel, setShowUpdateJEntryPanel] = useState(false);
  const [showCreateEventPanel, setShowCreateEventPanel] = useState(false);
  const [showUpdateEventPanel, setShowUpdateEventPanel] = useState(false);

  function resetPanels() {
    setShowCreateTaskPanel(false);
    setShowUpdateTaskPanel(false);
    setShowSessionPanel(false);
    setShowCreateEventPanel(false);
    setShowUpdateEventPanel(false);
    setShowCreateJEntryPanel(false);
    setShowUpdateJEntryPanel(false);
    setShowCreateEventPanel(false);
    setShowUpdateEventPanel(false);
  }

  function openCreateTaskPanel() {
    resetPanels();
    setShowCreateTaskPanel(true);
  }

  function closeCreateTaskPanel() {
    resetPanels();
    setShowCreateTaskPanel(false);
  }

  function openUpdateTaskPanel() {
    resetPanels();
    setShowUpdateTaskPanel(true);
  }

  function closeUpdateTaskPanel() {
    resetPanels();
    setShowUpdateTaskPanel(false);
  }

  function openSessionPanel() {
    resetPanels();
    setShowSessionPanel(true);
  }

  function closeSessionPanel() {
    resetPanels();
    setShowSessionPanel(false);
  }

  function openUpdateEventPanel() {
    resetPanels();
    setShowUpdateEventPanel(true);
  }

  function closeUpdateEventPanel() {
    resetPanels();
    setShowUpdateEventPanel(false);
  }
  function openCreateJEntryPanel() {
    resetPanels();
    setShowCreateJEntryPanel(true);
  }
  
  function closeCreateJEntryPanel() {
    resetPanels();
    setShowCreateJEntryPanel(false);
  }

  function openUpdateJEntryPanel() {
    resetPanels();
    setShowUpdateJEntryPanel(true);
  }
  
  function closeUpdateJEntryPanel() {
    resetPanels();
    setShowUpdateJEntryPanel(false);
  }


  function openCreateEventPanel() {
    resetPanels();
    setShowCreateEventPanel(true);
  }

  function closeCreateEventPanel() {
    resetPanels();
    setShowCreateEventPanel(false);
  }

  return (
    <PanelContext.Provider
      value={{
        showCreateTaskPanel,
        showUpdateTaskPanel,
        showSessionPanel,
        showCreateEventPanel,
        showUpdateEventPanel,
        showCreateJEntryPanel,
        showUpdateJEntryPanel,
        openCreateTaskPanel,
        closeCreateTaskPanel,
        openUpdateTaskPanel,
        closeUpdateTaskPanel,
        openSessionPanel,
        closeSessionPanel,
        openCreateEventPanel,
        closeCreateEventPanel,
        openUpdateEventPanel,
        closeUpdateEventPanel,
        openCreateJEntryPanel,
        closeCreateJEntryPanel,
        openUpdateJEntryPanel,
        closeUpdateJEntryPanel,
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}
