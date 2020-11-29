import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopTracks } from 'src/app/models/top-tracks/top-tracks';

@Injectable({
  providedIn: 'root',
})
export class TopTracksService {
  constructor(private http: HttpClient) {}

  getTopTracksLongTerm(): Observable<TopTracks> {
    const url =
      'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5';
    return this.http.get<TopTracks>(url);
  }

  getTopTracksShortTerm(): Observable<TopTracks> {
    const url =
      'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10';
    return this.http.get<TopTracks>(url);
  }
}
