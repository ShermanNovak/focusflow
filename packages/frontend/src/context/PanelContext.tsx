import { useState, createContext } from "react";

export const PanelContext = createContext({
  showCreateTaskPanel: false,
  showUpdateTaskPanel: false,
  showSessionPanel: false,
  showCreateJEntryPanel: false,
  openCreateTaskPanel: () => {},
  closeCreateTaskPanel: () => {},
  openUpdateTaskPanel: () => {},
  closeUpdateTaskPanel: () => {},
  openSessionPanel: () => {},
  closeSessionPanel: () => {},
  openCreateJEntryPanel: () => {},
  closeCreateJEntryPanel: () => {},
});

export function PanelContextProvider(props: any) {
  const [showCreateTaskPanel, setShowCreateTaskPanel] = useState(false);
  const [showUpdateTaskPanel, setShowUpdateTaskPanel] = useState(false);
  const [showSessionPanel, setShowSessionPanel] = useState(false);
  const [showCreateJEntryPanel, setShowCreateJEntryPanel] = useState(false);

  function resetPanels() {
    setShowCreateTaskPanel(false);
    setShowUpdateTaskPanel(false);
    setShowSessionPanel(false);
    setShowCreateJEntryPanel(false);
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

  function openCreateJEntryPanel() {
    resetPanels();
    setShowCreateJEntryPanel(true);
  }
  
  function closeCreateJEntryPanel() {
    resetPanels();
    setShowCreateJEntryPanel(false);
  }

  return (
    <PanelContext.Provider
      value={{
        showCreateTaskPanel,
        showUpdateTaskPanel,
        showSessionPanel,
        showCreateJEntryPanel,
        openCreateTaskPanel,
        closeCreateTaskPanel,
        openUpdateTaskPanel,
        closeUpdateTaskPanel,
        openSessionPanel,
        closeSessionPanel,
        openCreateJEntryPanel,
        closeCreateJEntryPanel,
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}
