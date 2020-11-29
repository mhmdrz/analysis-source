import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../../models/recommendation/recommendation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  constructor(private http: HttpClient) {}

  getMoodRecommend(
    market: string,
    valence: number,
    artistSeeds: string,
    genreSeeds: string,
    trackSeeds: string
  ): Observable<Recommendation> {
    const url =
      'https://api.spotify.com/v1/recommendations?limit=10&market=' +
      market +
      '&seed_artists=' +
      artistSeeds +
      '&seed_genres=' +
      genreSeeds +
      '&seed_tracks=' +
      trackSeeds +
      '&max_valence=' +
      valence;
    return this.http.get<Recommendation>(url);
  }
}
