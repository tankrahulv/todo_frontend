import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  proImg =
    'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    setTimeout(() => { 
      this.isLoggedIn$ = this.authService.isLoggedIn;
      if (this.isLoggedIn$) {
        let userDetails = JSON.parse(localStorage.getItem('userDetails'));
        this.proImg =
        userDetails && userDetails.photoUrl
        ? userDetails.photoUrl
        : 'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg';
      }
    }, 2000);
  }

  onLogout() {
    this.authService.logout();
  }
}
