import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';

@Injectable()
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private authService: SocialAuthService ) {}

  login() {
    this.loggedIn.next(true);
    this.router.navigate(['/task']);
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('userDetails');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
