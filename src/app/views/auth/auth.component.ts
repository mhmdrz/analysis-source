import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private token: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.token = this.getParam('access_token');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
    localStorage.setItem('currentUser', JSON.stringify(this.token));
    this.router.navigate(['/dashboard']);
  }

  private getParam(name: string) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?#&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
