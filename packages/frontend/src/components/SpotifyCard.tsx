import React, { useState } from "react";
import Cookies from "universal-cookie";
import { loginPath, refreshSpotifyToken } from "../services/spotify.service";

export default function SpotifyCard({ showModal, handleShowModal, selectedSong } : { 
  showModal: boolean,
  handleShowModal: React.Dispatch<React.SetStateAction<boolean>>, 
  selectedSong: any 
}) {
  const [playing, setPlaying] = useState<boolean>(false);
  const cookies = new Cookies();

  const handleClick = async () => {
    if (!cookies.get("spotify-token")) await refreshSpotifyToken();
    handleShowModal(true);
  }

  return (
    <div 
      style={{ background: "#010830" }}
      className="flex items-center rounded-md w-max "
    >
      {!selectedSong && <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" style={{fill:"#000000"}} className="ml-[25px]">
        <g fill="#1db954" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(5.12,5.12)"><path d="M25.009,1.982c-12.687,0 -23.009,10.322 -23.009,23.009c0,12.687 10.322,23.009 23.009,23.009c12.687,0 23.009,-10.321 23.009,-23.009c0,-12.688 -10.322,-23.009 -23.009,-23.009zM34.748,35.333c-0.289,0.434 -0.765,0.668 -1.25,0.668c-0.286,0 -0.575,-0.081 -0.831,-0.252c-2.473,-1.649 -6.667,-2.749 -10.167,-2.748c-3.714,0.002 -6.498,0.914 -6.526,0.923c-0.784,0.266 -1.635,-0.162 -1.897,-0.948c-0.262,-0.786 0.163,-1.636 0.949,-1.897c0.132,-0.044 3.279,-1.075 7.474,-1.077c3.5,-0.002 8.368,0.942 11.832,3.251c0.69,0.46 0.876,1.391 0.416,2.08zM37.74,29.193c-0.325,0.522 -0.886,0.809 -1.459,0.809c-0.31,0 -0.624,-0.083 -0.906,-0.26c-4.484,-2.794 -9.092,-3.385 -13.062,-3.35c-4.482,0.04 -8.066,0.895 -8.127,0.913c-0.907,0.258 -1.861,-0.272 -2.12,-1.183c-0.259,-0.913 0.272,-1.862 1.184,-2.12c0.277,-0.079 3.854,-0.959 8.751,-1c4.465,-0.037 10.029,0.61 15.191,3.826c0.803,0.5 1.05,1.56 0.548,2.365zM40.725,22.013c-0.373,0.634 -1.041,0.987 -1.727,0.987c-0.344,0 -0.692,-0.089 -1.011,-0.275c-5.226,-3.068 -11.58,-3.719 -15.99,-3.725c-0.021,0 -0.042,0 -0.063,0c-5.333,0 -9.44,0.938 -9.481,0.948c-1.078,0.247 -2.151,-0.419 -2.401,-1.495c-0.25,-1.075 0.417,-2.149 1.492,-2.4c0.185,-0.043 4.573,-1.053 10.39,-1.053c0.023,0 0.046,0 0.069,0c4.905,0.007 12.011,0.753 18.01,4.275c0.952,0.56 1.271,1.786 0.712,2.738z"></path></g></g>
      </svg>}
      {cookies.get("spotify-refresh-token")
        ? (selectedSong 
          ? <div className="flex">
              <img className="h-8 w-8 my-auto ml-[17px]" src={selectedSong.album.images[selectedSong.album.images.length-1].url} alt=""/>
              <div className="text-[14px] text-white mr-[17px] ml-[17px] my-[15px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px] cursor-pointer" onClick={() => handleShowModal(true)}>
                <p className="mt-0 mb-[5px] font-bold text-ellipsis overflow-hidden" >{selectedSong.name}</p>
                <p className="m-0 text-ellipsis text-ellipsis overflow-hidden">{selectedSong.artists.map((artist: any) => artist.name).join(", ")}</p>
              </div>
              <span className="h-8 w-8 my-auto mr-[20px] cursor-pointer">
                {playing 
                  ? <svg onClick={() => setPlaying(false)} fill="#FFFFFF" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pause</title> <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"></path> </g></svg>
                  : <svg onClick={() => setPlaying(true)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z" fill="#ffffff"></path></g></svg>
                }
              </span>
            </div>
          : <div className="text-[14px] text-white mr-[25px] ml-[14px] my-[15px] cursor-pointer" onClick={() => handleClick()}>
              <p className="mt-0 mb-[5px] font-bold">Add Your Song of the Day</p>
              <p className="m-0">What resonates with you today?</p>
            </div>
        ) : 
          <div className="text-[14px] text-white mr-[25px] ml-[14px] my-[15px] cursor-pointer" onClick={() => { window.location.href = loginPath }}>
            <p className="mt-0 mb-[5px] font-bold">Login to spotify</p>
            <p className="m-0">Configure your song of the day now!</p>
          </div>
      }
    </div>
  );
}
