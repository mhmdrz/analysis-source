import { RecommendationTracks } from './recommendation-tracks';

export class Recommendation {
  tracks: RecommendationTracks[];
  seeds: {
    initialPoolSize: number;
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    type: string;
  }[];

  constructor(
    tracks: RecommendationTracks[],
    seeds: {
      initialPoolSize: number;
      afterFilteringSize: number;
      afterRelinkingSize: number;
      href: string;
      id: string;
      type: string;
    }[]
  ) {
    this.tracks = tracks;
    this.seeds = seeds;
  }
}
