export class TopArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
  }[];
  name: string;
  popularity: number;
  uri: string;
}
