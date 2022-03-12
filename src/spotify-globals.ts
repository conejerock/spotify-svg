require("dotenv").config();
import SpotifyWebApi from "spotify-web-api-node";

const TOKEN_NAME_FILE: string = "tokens.json";
const CURRENT_SONG_NAME_FILE: string = "current.json";
const SVG_SRC_FILE: string = "src.svg";
const SVG_DST_FILE: string = "dst.svg";

const EXPRESS_PORT: number = Number(process.env.EXPRESS_PORT) || 80;
const EXPRESS_SVG_PATH: string = process.env.EXPRESS_SVG_PATH || "current.svg";
const EXPRESS_HOSTNAME: string = process.env.EXPRESS_HOSTNAME || "localhost";
const EXPRESS_HOST: string = `http://${EXPRESS_HOSTNAME}${EXPRESS_PORT ? `:${EXPRESS_PORT}` : ""}`;

const EXPRESS_CALLBACK: string = process.env.EXPRESS_CALLBACK || "callback";
const EXPRESS_CREATE_TOKEN_PORT: number = Number(process.env.EXPRESS_CREATE_TOKEN_PORT) || 8888;

const SPOTIFY_LIST_SCOPES: string[] = ["user-read-currently-playing"];
const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET_ID: string = process.env.SPOTIFY_CLIENT_SECRET_ID;
const SPOTIFY_CALLBACK: string = `http://${EXPRESS_HOSTNAME}:${EXPRESS_CREATE_TOKEN_PORT}/${EXPRESS_CALLBACK}`;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET_ID) {
  throw new Error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET_ID are mandatory in .env file");
}

const URL_SVG = `${EXPRESS_HOST}/${EXPRESS_SVG_PATH}`;

const SpotifyApiInstance: SpotifyWebApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET_ID,
  redirectUri: SPOTIFY_CALLBACK,
});

export {
  EXPRESS_PORT,
  EXPRESS_CALLBACK,
  EXPRESS_SVG_PATH,
  SPOTIFY_LIST_SCOPES,
  URL_SVG,
  SpotifyApiInstance,
  TOKEN_NAME_FILE,
  CURRENT_SONG_NAME_FILE,
  EXPRESS_CREATE_TOKEN_PORT,
  SVG_SRC_FILE,
  SVG_DST_FILE,
};
