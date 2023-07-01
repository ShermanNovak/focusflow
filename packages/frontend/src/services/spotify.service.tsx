import axios from 'axios';
import { Buffer } from 'buffer';
import { SpotifyToken } from '../types/spotify.d';
import Cookies from 'universal-cookie';
import { redirect } from 'react-router-dom';

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const scopes = "user-modify-playback-state";
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const loginPath = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}`;

const path = "https://accounts.spotify.com/api/token";

const basic_code = process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const cookies = new Cookies();

export async function spotifyToken(callback_code: String | null) {
  return axios.post(path, {
    grant_type: "authorization_code",
    code: callback_code,
    redirect_uri
  },{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(basic_code).toString('base64')}`
    }
  }).then((res: { data: SpotifyToken }) => {
    cookies.set("spotify-token", res.data.access_token, { path: "/"});
    cookies.set("spotify-refresh-token", res.data.refresh_token, { path: "/" });
    return redirect("/");
  });
}

const apiPath = "https://api.spotify.com/v1/search";
const access_token = "";

export async function spotifySearch(query: String) {
  return axios.get(apiPath, {
    params: {
      q: query,
      type: "track"
    },
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }).then((res) => res.data)
  .catch(err => console.log(err));
}
