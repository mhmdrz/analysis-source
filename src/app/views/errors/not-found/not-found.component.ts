import { Component, OnInit } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    particlesJS.load('a-container', 'assets/particles.json', () => {});
  }
}
