import SpotifyCard from "../components/SpotifyCard";
import SpotifyModal from "../features/spotify/SpotifyModal";

import { useState } from "react";

export default function DailyAchievements() {
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>();

  return (
    <div className="p-8 w-full">
      <SpotifyCard
        handleShowModal={setShowSpotifyModal}
        selectedSong={selectedSong}
      />
      <SpotifyModal
        open={showSpotifyModal}
        showModal={setShowSpotifyModal}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
      />
    </div>
  );
}
