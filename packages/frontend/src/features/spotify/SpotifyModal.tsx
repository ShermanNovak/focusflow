import { Modal, Input, Table, Avatar } from "antd"
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { spotifySearch } from "../../services/spotify.service";

export default function SpotifyModal({ open, showModal } : { open: boolean, showModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "#",
      render: (track: any) => results.indexOf(track) + 1
    },
    {
      title: "Title",
      key: "title",
      render: (track: any) => (
        <div className="flex w-96">
          <img className="h-10 w-10 my-auto mr-2" src={track.album.images[track.album.images.length-1].url}/>
          <div className="text-ellipsis whitespace-nowrap overflow-hidden">
            <b>{track.name}</b>
            <p className="my-0 text-ellipsis overflow-hidden">{track.artists.map((artist: any) => artist.name).join(", ")}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (album: any) => <div className="text-ellipsis whitespace-nowrap w-48 overflow-hidden">{album.name}</div> 
    },
  ]
  const fetchSpotifyResults = (query: string) => {
    spotifySearch(query).then((data) => {
      setResults(data.tracks.items)
      setLoading(false);
    });
  }

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchSpotifyResults(query);
    } else {
      setResults([]);
    }
  }, [query])

  return (
    <Modal
      title="Song Of The Day"
      okText="Select"
      onCancel={() => showModal(false)}
      open={open}
      centered
      width={720}
    >
      <Input placeholder="Search for a song" onChange={debounce((event) => setQuery(event.target.value), 250)}/>
      {query && <Table className="mt-4" dataSource={results} columns={columns} size={"small"} loading={loading}/>}
    </Modal>
  );
}
