import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSbj: BehaviorSubject<string>;
  currentUser: Observable<string>;

  constructor() {
    this.currentUserSbj = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSbj.asObservable();
  }

  get currentUserValue(): string {
    return this.currentUserSbj.value;
  }

  redirectToLogin() {
    const clientId = environment.client_id;
    const redirectUri = 'https://mhmdrz.github.io/analysis/auth';
    const scopes = 'user-read-private user-read-email user-top-read';
    const url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' +
      clientId +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri);
    window.location.href = url;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSbj.next(null);
  }
}
