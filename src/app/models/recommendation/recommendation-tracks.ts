export class RecommendationTracks {
  album: {
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  linked_form: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;

  constructor(
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    },
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: {
      isrc: string;
    },
    external_urls: {
      spotify: string;
    },
    href: string,
    id: string,
    is_local: boolean,
    is_playable: boolean,
    linked_form: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    },
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
  ) {
    this.album = album;
    this.artists = artists;
    this.disc_number = disc_number;
    this.duration_ms = duration_ms;
    this.explicit = explicit;
    this.external_ids = external_ids;
    this.external_urls = external_urls;
    this.href = href;
    this.id = id;
    this.is_local = is_local;
    this.is_playable = is_playable;
    this.linked_form = linked_form;
    this.name = name;
    this.popularity = popularity;
    this.preview_url = preview_url;
    this.track_number = track_number;
    this.type = type;
    this.uri = uri;
  }
}
