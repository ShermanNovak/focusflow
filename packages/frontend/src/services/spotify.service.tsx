import axios from "axios";
import { Buffer } from "buffer";
import { SpotifyToken } from "../types/spotify.d";
import Cookies from "universal-cookie";

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const scopes = [
  "user-modify-playback-state",
  "user-read-playback-state",
  "streaming user-read-email",
  "user-read-private",
].join(" ");

const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const loginPath = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}`;

const path = "https://accounts.spotify.com/api/token";

const basic_code =
  process.env.REACT_APP_SPOTIFY_CLIENT_ID +
  ":" +
  process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const cookies = new Cookies();

export async function spotifyToken(callback_code: String | null) {
  return axios
    .post(
      path,
      {
        grant_type: "authorization_code",
        code: callback_code,
        redirect_uri,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(basic_code).toString("base64")}`,
        },
      }
    )
    .then((res: { data: SpotifyToken }) => {
      cookies.set("spotify-token", res.data.access_token, {
        path: "/",
        maxAge: res.data.expires_in,
      });
      cookies.set("spotify-refresh-token", res.data.refresh_token, {
        path: "/",
      });
      window.location.href = "/";
    });
}

export async function refreshSpotifyToken() {
  return axios
    .post(
      path,
      {
        grant_type: "refresh_token",
        refresh_token: cookies.get("spotify-refresh-token"),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(basic_code).toString("base64")}`,
        },
      }
    )
    .then((res) => {
      cookies.set("spotify-token", res.data.access_token, {
        path: "/",
        maxAge: res.data.expires_in,
      });
    });
}

const apiPath = "https://api.spotify.com/v1";

export async function spotifySearch(query: String) {
  return axios
    .get(`${apiPath}/search`, {
      params: {
        q: query,
        type: "track",
      },
      headers: {
        Authorization: `Bearer ${cookies.get("spotify-token")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function transferPlayback(device_id: string) {
  return axios
    .put(
      `${apiPath}/me/player`,
      {
        device_ids: [device_id],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("spotify-token")}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function playSong(uri: string, device_id: string) {
  return axios
    .put(
      `${apiPath}/me/player/play`,
      { uris: [uri] },
      {
        params: { device_id },
        headers: {
          Authorization: `Bearer ${cookies.get("spotify-token")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getSong(id: String) {
  return axios
    .get(`${apiPath}/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("spotify-token")}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
