import path from "path";
require("dotenv").config();
import { blue, bold, green } from "colorette";
import { EXPRESS_PORT, SVG_DST_FILE, EXPRESS_SVG_PATH, URL_SVG } from "./spotify-globals";
import SpotifyAuth from "./types/SpotifyAuth";
import SpotifyCurrentTrack from "./types/SpotifyCurrentTrack";
import { loadAuth, saveInfo, saveSvg } from "./manage-info";
import express from "express";
import { spotifyCurrentSong, spotifyUpdateTokens } from "./spotify-methods";

const main = async (): Promise<void> => {
  const spotifyAuth: SpotifyAuth = await loadAuth();
  await spotifyUpdateTokens(spotifyAuth);
  const currentSongTrack: SpotifyCurrentTrack | undefined = await spotifyCurrentSong();
  if (currentSongTrack?.currently_playing_type === "track") {
    saveInfo(currentSongTrack);
    saveSvg(currentSongTrack);
  }
};

const startDaemon = async () => {
  await main();
  setInterval(() => {
    main();
  }, 5000);
};

const app = express();
let daemon;

process.on("SIGINT", function () {
  console.log(`\n\n${blue(bold("[Spotify-SVG]: Bye..."))}\n\n`);
  clearInterval(daemon);
  process.exit(1);
});

app.get(`/${EXPRESS_SVG_PATH}`, (req, res) => {
  const svgDstPath: string = path.resolve(__dirname, `svg/${SVG_DST_FILE}`);
  res.sendFile(svgDstPath);
});

app.listen(EXPRESS_PORT, async () => {
  try {
    console.log(green(`\n[Spotify-SVG]: Your SVG file is in: ${bold(`${URL_SVG}`)}\n`));
    daemon = await startDaemon();
  } catch (e) {
    console.log(e.message);
  }
});
