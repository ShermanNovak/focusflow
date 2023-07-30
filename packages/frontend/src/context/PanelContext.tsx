import { useState, createContext } from "react";

export const PanelContext = createContext({
  showCreateTaskPanel: false,
  showUpdateTaskPanel: false,
  showSessionPanel: false,
  showCreateEventPanel: false,
  showUpdateEventPanel: false,
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
});

export function PanelContextProvider(props: any) {
  const [showCreateTaskPanel, setShowCreateTaskPanel] = useState(false);
  const [showUpdateTaskPanel, setShowUpdateTaskPanel] = useState(false);
  const [showSessionPanel, setShowSessionPanel] = useState(false);
  const [showCreateEventPanel, setShowCreateEventPanel] = useState(false);
  const [showUpdateEventPanel, setShowUpdateEventPanel] = useState(false);

  function resetPanels() {
    setShowCreateTaskPanel(false);
    setShowUpdateTaskPanel(false);
    setShowSessionPanel(false);
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

  function openCreateEventPanel() {
    resetPanels();
    setShowCreateEventPanel(true);
  }

  function closeCreateEventPanel() {
    resetPanels();
    setShowCreateEventPanel(false);
  }

  function openUpdateEventPanel() {
    resetPanels();
    setShowUpdateEventPanel(true);
  }

  function closeUpdateEventPanel() {
    resetPanels();
    setShowUpdateEventPanel(false);
  }

  return (
    <PanelContext.Provider
      value={{
        showCreateTaskPanel,
        showUpdateTaskPanel,
        showSessionPanel,
        showCreateEventPanel,
        showUpdateEventPanel,
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
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}
