export class TrackFeatures {
  duration_ms: number;
  key: number;
  mode: number;
  time_signature: number;
  acousticness: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  speechiness: number;
  valence: number;
  tempo: number;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  type: string;

  constructor(
    duration_ms: number,
    key: number,
    mode: number,
    time_signature: number,
    acousticness: number,
    energy: number,
    instrumentalness: number,
    liveness: number,
    loudness: number,
    speechiness: number,
    valence: number,
    tempo: number,
    id: string,
    uri: string,
    track_href: string,
    analysis_url: string,
    type: string
  ) {
    this.duration_ms = duration_ms;
    this.key = key;
    this.mode = mode;
    this.time_signature = time_signature;
    this.acousticness = acousticness;
    this.energy = energy;
    this.instrumentalness = instrumentalness;
    this.liveness = liveness;
    this.loudness = loudness;
    this.speechiness = speechiness;
    this.valence = valence;
    this.tempo = tempo;
    this.id = id;
    this.uri = uri;
    this.track_href = track_href;
    this.analysis_url = analysis_url;
    this.type = type;
  }
}
