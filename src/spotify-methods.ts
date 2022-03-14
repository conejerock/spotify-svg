import SpotifyCurrentTrack from "./types/SpotifyCurrentTrack";
import { SpotifyApiInstance } from "./spotify-globals";
import { loadInfo, saveAuth } from "./manage-info";
import SpotifyAuth from "./types/SpotifyAuth";
import { bgWhite, black, red } from "colorette";

export const spotifyCurrentSong = async (): Promise<SpotifyCurrentTrack | undefined> => {
  try {
    return (await SpotifyApiInstance.getMyCurrentPlayingTrack()).body;
  } catch (e) {
    console.log(e);
    const currentSong: SpotifyCurrentTrack | undefined = loadInfo();
    if (currentSong) {
      return currentSong;
    }
  }
};

export const spotifyUpdateTokens = async (spotifyAuth: SpotifyAuth): Promise<void> => {
  try {
    SpotifyApiInstance.setAccessToken(spotifyAuth.accessToken);
    SpotifyApiInstance.setRefreshToken(spotifyAuth.refreshToken);
    return await SpotifyApiInstance.refreshAccessToken().then((data) => {
      SpotifyApiInstance.setAccessToken(data.body["access_token"]);
      saveAuth({
        accessToken: data.body["access_token"],
        refreshToken: data.body["refresh_token"] ? data.body["refresh_token"] : SpotifyApiInstance.getRefreshToken(),
      });
    });
  } catch (e) {
    const message = red(`[Spotify-SVG Error]: Tokens has expired file. Please execute ${black(bgWhite(`yarn create-token`))}`);
    throw new Error(message);
  }
};
