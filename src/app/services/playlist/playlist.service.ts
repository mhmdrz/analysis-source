import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/playlist/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getFeaturedPlaylists(country: string): Observable<Playlist> {
    const url =
      'https://api.spotify.com/v1/browse/featured-playlists?limit=10&country=' +
      country;
    return this.http.get<Playlist>(url);
  }
}
