import { Modal, Input, Table, InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { spotifySearch } from "../../services/spotify.service";
import { setSOTD } from "../../services/sotd.service";

export default function SpotifyModal({
  open,
  showModal,
  selectedSong,
  setSelectedSong,
}: {
  open: boolean;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSong: Spotify.Track;
  setSelectedSong: React.Dispatch<React.SetStateAction<Spotify.Track>>;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Spotify.Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<any>();

  const ref = useRef<InputRef>(null);

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Title",
      key: "title",
      render: (track: Spotify.Track) => (
        <div className="flex w-96 cursor-pointer">
          <img
            className="h-10 w-10 my-auto mr-3"
            src={track.album.images[track.album.images.length - 1].url}
            alt=""
          />
          <div className="text-ellipsis whitespace-nowrap overflow-hidden">
            <b>{track.name}</b>
            <p className="my-0 text-ellipsis overflow-hidden">
              {track.artists
                .map((artist: Spotify.Entity) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (album: Spotify.Album) => (
        <div className="text-ellipsis whitespace-nowrap w-48 overflow-hidden">
          {album.name}
        </div>
      ),
    },
  ];
  const fetchSpotifyResults = (query: string) => {
    spotifySearch(query).then((data) => {
      setResults(data.tracks.items);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchSpotifyResults(query);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <Modal
      title="Song Of The Day"
      okText="Confirm"
      onCancel={() => {
        setQuery("");
        showModal(false);
        setSelectedKey(null);
        setResults([]);
        if (ref.current && ref.current.input) ref.current.input.value = "";
      }}
      onOk={() => {
        const selectedSong = results[selectedKey - 1];
        setQuery("");
        setSelectedSong(selectedSong);
        setSOTD({ name: selectedSong.name, uri: selectedSong.uri, user: "" });
        setResults([]);
        showModal(false);
        setSelectedKey(null);
        if (ref.current && ref.current.input) ref.current.input.value = "";
      }}
      open={open}
      centered
      width={720}
    >
      {selectedSong && (
        <div className="flex w-96 mb-3 ml-1">
          <img
            className="h-10 w-10 my-auto mr-3"
            src={
              selectedSong.album.images[selectedSong.album.images.length - 1]
                .url
            }
            alt=""
          />
          <div className="text-ellipsis whitespace-nowrap overflow-hidden">
            <b>{selectedSong.name}</b>
            <p className="my-0 text-ellipsis overflow-hidden">
              {selectedSong.artists
                .map((artist: Spotify.Entity) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
      )}
      <Input
        placeholder="Search for a song"
        onChange={debounce((event) => setQuery(event.target.value), 250)}
        ref={ref}
        allowClear
      />
      {query && (
        <Table
          className="mt-4"
          dataSource={results.map((item, index) => ({
            ...item,
            key: index + 1,
          }))}
          columns={columns}
          size={"small"}
          loading={loading}
          pagination={{ pageSize: window.innerHeight > 1080 ? 10 : 5 }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [selectedKey],
            onChange: (selectedRowKeys: React.Key[]) => {
              setSelectedKey(selectedRowKeys[0]);
            },
          }}
          onRow={(row) => ({
            onClick: () => {
              setSelectedKey(row.key);
            },
          })}
        />
      )}
    </Modal>
  );
}
