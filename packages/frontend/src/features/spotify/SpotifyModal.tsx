import { Modal, Input, Table } from "antd"
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
      render: (track: any) => <>
        <b>{track.name}</b>
        <p className="my-0">{track.artists.map((artist: any) => artist.name).join(", ")}</p>
      </>,
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (album: any) => album.name
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
    >
      <Input placeholder="Search for a song" onChange={debounce((event) => setQuery(event.target.value), 250)}/>
      {query && <Table className="mt-4" dataSource={results} columns={columns} size={"small"} loading={loading}/>}
    </Modal>
  );
}
