import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopArtists } from 'src/app/models/top-artists/top-artists';

@Injectable({
  providedIn: 'root',
})
export class TopArtistsService {
  constructor(private http: HttpClient) {}

  getTopArtistsLongTerm(): Observable<TopArtists> {
    const url =
      'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term';
    return this.http.get<TopArtists>(url);
  }

  getTopArtistsShortTerm(): Observable<TopArtists> {
    const url =
      'https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term';
    return this.http.get<TopArtists>(url);
  }
}
