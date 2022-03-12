import SpotifyCurrentTrack from "./types/SpotifyCurrentTrack";
import fs from "fs";
import path from "path";
import {CURRENT_SONG_NAME_FILE, SVG_DST_FILE, SVG_SRC_FILE, TOKEN_NAME_FILE} from "./spotify-globals";
import {bgWhite, black, bold, red} from "colorette";
import SpotifyAuth from "./types/SpotifyAuth";

export const saveInfo = (info: SpotifyCurrentTrack): void => {
  const currentPath: string = path.resolve(__dirname, CURRENT_SONG_NAME_FILE);
  try {
    fs.writeFileSync(currentPath, JSON.stringify(info, null, 2), {
      encoding: "utf-8",
    });
  } catch {
    throw new Error(red(`[Spotify-SVG Error]: Cannot save ${currentPath}`));
  }
};

export const loadInfo = (): SpotifyCurrentTrack | undefined => {
  const currentPath: string = path.resolve(__dirname, CURRENT_SONG_NAME_FILE);
  try {
    const infoStr: string = fs.readFileSync(currentPath, {
      encoding: "utf-8",
    });
    return JSON.parse(infoStr) as SpotifyCurrentTrack;
  } catch {
    throw new Error(red(`[Spotify-SVG Error]: Cannot load ${currentPath}`));
  }
};

const getThumbAlbum = (info: SpotifyCurrentTrack): string => {
  const image = info.item.album.images.find((i) => i.height === 300);
  return image?.url || info.item.album.images[0].url;
};

export const saveSvg = (info: SpotifyCurrentTrack): void => {
  const svgSrcPath: string = path.resolve(__dirname, `svg/${SVG_SRC_FILE}`);
  const svgDstPath: string = path.resolve(__dirname, `svg/${SVG_DST_FILE}`);
  try {
    let svgStr: string = fs.readFileSync(svgSrcPath, {
      encoding: "utf-8",
    });
    svgStr = svgStr
      .replace("#{PLACEHOLDER_TEXT}#", `${info.item.name} - ${info.item.artists[0].name}`)
      .replace(`#{PLACEHOLDER_IMAGE}#`, getThumbAlbum(info))
      .replace(`#{PLACEHOLDER_IMAGE}#`, getThumbAlbum(info));

    fs.writeFileSync(svgDstPath, svgStr, {
      encoding: "utf-8",
    });
  } catch {
    throw new Error(red(`[Spotify-SVG Error]: Cannot save ${svgSrcPath}`));
  }
};

export const saveAuth = (auth: SpotifyAuth): void => {
  const currentPath: string = path.resolve(__dirname, TOKEN_NAME_FILE);
  fs.writeFileSync(currentPath, JSON.stringify(auth, null, 2), {
    encoding: "utf-8",
  });
};

export const loadAuth = (): SpotifyAuth => {
  const codePath: string = path.resolve(__dirname, TOKEN_NAME_FILE);
  try {
    const spotifyAuth: SpotifyAuth = JSON.parse(
        fs.readFileSync(codePath, {
          encoding: "utf-8",
        })
    );

    return spotifyAuth;
  } catch (e) {
    const message = red(`[Spotify-SVG Error]: Cannot read ${bold(codePath)} file. \n\nPlease execute ${black(bgWhite(`yarn create-token`))}`);
    throw new Error(message);
  }
};
