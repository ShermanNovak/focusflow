import { useState, createContext } from "react";

export const PanelContext = createContext({
  showCreateTaskPanel: false,
  showUpdateTaskPanel: false,
  openCreateTaskPanel: () => {},
  closeCreateTaskPanel: () => {},
  openUpdateTaskPanel: () => {},
  closeUpdateTaskPanel: () => {},
});

export function PanelContextProvider(props: any) {
  const [showCreateTaskPanel, setShowCreateTaskPanel] = useState(false);
  const [showUpdateTaskPanel, setShowUpdateTaskPanel] = useState(false);

  function openCreateTaskPanel() {
    setShowCreateTaskPanel(true);
  }

  function closeCreateTaskPanel() {
    setShowCreateTaskPanel(false);
  }

  function openUpdateTaskPanel() {
    setShowUpdateTaskPanel(true);
  }

  function closeUpdateTaskPanel() {
    setShowUpdateTaskPanel(false);
  }

  return (
    <PanelContext.Provider
      value={{
        showCreateTaskPanel,
        showUpdateTaskPanel,
        openCreateTaskPanel,
        closeCreateTaskPanel,
        openUpdateTaskPanel,
        closeUpdateTaskPanel,
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}