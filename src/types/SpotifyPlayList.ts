import SpotifyPlayListTrack from "./SpotifyPlayListTrack";

export default interface SpotifyPlayList {
  items: SpotifyPlayListTrack[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
