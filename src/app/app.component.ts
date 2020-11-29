import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { fadeAnimation } from './utils/route-animation/fade-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  title = 'analysis';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scroll(0, 0);
    });
  }
}
