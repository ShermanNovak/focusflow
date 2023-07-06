import { useState } from 'react';
import TaskModal from '../features/tasks/TaskModal';
import TaskPanel from '../features/tasks/TaskPanel';
import SpotifyCard from '../components/SpotifyCard';
import SpotifyModal from '../features/spotify/SpotifyModal';

export default function HomePage() {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showTaskPanel, setShowTaskPanel] = useState(true);
    const [showSpotifyModal, setShowSpotifyModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState<any>();

    return (
      <>
        {showTaskModal && <TaskModal />}
        {showTaskPanel && <TaskPanel />}
        <SpotifyCard showModal={showSpotifyModal} handleShowModal={setShowSpotifyModal} selectedSong={selectedSong}/>
        <SpotifyModal 
          open={showSpotifyModal} 
          showModal={setShowSpotifyModal} 
          selectedSong={selectedSong} 
          setSelectedSong={setSelectedSong}
        />
      </>
    );
  }
  
