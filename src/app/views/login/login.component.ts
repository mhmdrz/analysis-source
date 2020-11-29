import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
declare var particlesJS: any;
import gsap from 'gsap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    particlesJS.load('a-container', 'assets/particles.json', () => {});

    gsap.to('.a-title span', {
      translateY: 0,
      ease: 'expo.out',
      duration: 2,
    });
    gsap.to('.a-login-btn', {
      opacity: 1,
      ease: 'expo.out',
      duration: 2,
    });
  }

  loginBtnClicked() {
    this.authService.redirectToLogin();
  }
}
