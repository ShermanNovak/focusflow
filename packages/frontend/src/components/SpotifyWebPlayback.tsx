import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { playSong, transferPlayback } from "../services/spotify.service";

export default function SpotifyWebPlayback({
  selectedSong,
  handleShowModal,
}: {
  selectedSong: Spotify.Track;
  handleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [is_paused, setPaused] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");

  const cookies = new Cookies();
  const token = cookies.get("spotify-token");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "FocusFlow",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.3,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        transferPlayback(device_id);
        setDeviceId(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        console.log(state);

        setPaused(state.paused);
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    if (deviceId) playSong(selectedSong.uri, deviceId);
  }, [deviceId, selectedSong]);

  return (
    <>
      <div className="flex">
        <img
          className="h-8 w-8 my-auto ml-[17px]"
          src={
            selectedSong.album.images[selectedSong.album.images.length - 1].url
          }
          alt=""
        />
        <div
          className="text-[14px] text-white mr-[17px] ml-[17px] my-[15px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px] cursor-pointer"
          onClick={() => handleShowModal(true)}
        >
          <p className="mt-0 mb-[5px] font-bold text-ellipsis overflow-hidden">
            {selectedSong.name}
          </p>
          <p className="m-0 text-ellipsis text-ellipsis overflow-hidden">
            {selectedSong.artists
              .map((artist: Spotify.Entity) => artist.name)
              .join(", ")}
          </p>
        </div>
        {player && (
          <span
            className="h-8 w-8 my-auto mr-[20px] cursor-pointer"
            onClick={() => player.togglePlay()}
          >
            {!is_paused ? (
              <svg
                fill="#FFFFFF"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#FFFFFF"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>pause</title>{" "}
                  <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"></path>{" "}
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
            )}
          </span>
        )}
      </div>
    </>
  );
}
