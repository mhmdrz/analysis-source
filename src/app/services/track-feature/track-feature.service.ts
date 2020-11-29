import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackFeatures } from '../../models/track-features/track-features';

@Injectable({
  providedIn: 'root',
})
export class TrackFeatureService {
  constructor(private http: HttpClient) {}

  getTrackFeatures(id: string): Observable<TrackFeatures> {
    const url = 'https://api.spotify.com/v1/audio-features/' + id;
    return this.http.get<TrackFeatures>(url);
  }
}
