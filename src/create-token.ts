import express from "express";
import { blue, bold, green, black, bgWhite, red } from "colorette";
import { EXPRESS_CALLBACK, EXPRESS_PORT, SPOTIFY_LIST_SCOPES, SpotifyApiInstance } from "./spotify-globals";
import SpotifyAuth from "./types/SpotifyAuth";
import {saveAuth} from "./manage-info";

const app = express();

const createAuthorization = async (code: string) => {
  await SpotifyApiInstance.authorizationCodeGrant(code).then(
    function (data) {
      const spotifyAuth: SpotifyAuth = {
        accessToken: data.body["access_token"],
        refreshToken: data.body["refresh_token"],
      };
      saveAuth(spotifyAuth);
    },
    function (err) {
      throw new Error(red(`[Spotify-SVG Error]: Something went wrong!, ${err.message}`));
    }
  );
};

app.get(`/${EXPRESS_CALLBACK}`, async (req, res) => {
  const code: string = req.query.code as string;
  await createAuthorization(code);
  res.send("<p>Close browser.</p> <p>Open console.</p> <pre>yarn start</pre>");
  console.log(red(bold(`\nPlease run`)), black(bgWhite(`yarn start`)));
  console.log(blue(bold(`\n\nBye!`)));
  process.exit();
});

app.listen(EXPRESS_PORT, async () => {
  const authorizeURL = await SpotifyApiInstance.createAuthorizeURL(SPOTIFY_LIST_SCOPES);
  console.log(blue(bold(`\n\nPlease, click in ${green("green")} link to save your Spotify refresh-token\n`)));
  console.log(green(bold(authorizeURL)));
});
