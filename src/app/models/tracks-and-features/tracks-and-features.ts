import { TrackFeatures } from '../track-features/track-features';
import { TopTrack } from '../top-tracks/top-track';

export class TracksAndFeatures {
  track: TopTrack;
  features: TrackFeatures;

  constructor(track: TopTrack, features: TrackFeatures) {
    this.track = track;
    this.features = features;
  }
}
