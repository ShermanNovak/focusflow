import { useEffect, useState } from "react";
import { getSOTD } from "../services/sotd.service";
import { getSong } from "../services/spotify.service";
import { DatePicker } from "antd";

export default function DailyAchievements() {
  const [selectedSong, setSelectedSong] = useState<any>();
  const [date, setDate] = useState<Date>(new Date("2023-8-8"));

  useEffect(() => {
    getSOTD(date)
      .then((sotd) => {
        getSong(sotd.id).then((song) => setSelectedSong(song));
      })
      .catch((err) => {
        setSelectedSong(null);
        console.log(err);
      });
  }, [date]);

  return (
    <div className="p-8 w-full">
      <div className="flex gap-3">
        <span className="text-xl text-black font-bold">
          My Daily Achievements
        </span>
        <div className="">
          <DatePicker
            onChange={(_date, dateString) => setDate(new Date(dateString))}
          />
        </div>
      </div>
      <div className="pt-3">
        <div
          style={{ background: "#010830" }}
          className="flex items-center rounded-md w-max "
        >
          {selectedSong && (
            <div className="flex">
              <img
                className="h-8 w-8 my-auto ml-[17px]"
                src={
                  selectedSong.album.images[
                    selectedSong.album.images.length - 1
                  ].url
                }
                alt=""
              />
              <div className="text-[14px] text-white mr-[17px] ml-[17px] my-[15px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">
                <p className="mt-0 mb-[5px] font-bold text-ellipsis overflow-hidden">
                  {selectedSong.name}
                </p>
                <p className="m-0 text-ellipsis text-ellipsis overflow-hidden">
                  {selectedSong.artists
                    .map((artist: Spotify.Entity) => artist.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
