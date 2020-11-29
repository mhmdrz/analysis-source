import { PlaylistItems } from './playlist-items';

export class Playlist {
  message: string;
  playlists: {
    href: string;
    items: PlaylistItems[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };

  constructor(
    message: string,
    playlists: {
      href: string;
      items: PlaylistItems[];
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
    }
  ) {
    this.message = message;
    this.playlists = playlists;
  }
}
