import { useNavigate, useSearchParams } from "react-router-dom";
import { spotifyToken } from "../services/spotify.service";
import { useEffect } from "react";

export default function Spotify() {
  const navigate = useNavigate();
  const [params]= useSearchParams();
  useEffect(() => {
    spotifyToken(params.get("code")).catch(err => console.log(err));
    navigate("/");
  }, [])
  return <></>;
}
