import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private LoginAuthService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      if (this.loggedIn) {
        localStorage.setItem('userDetails', JSON.stringify(this.user));
        // this.saveUser();
        this.LoginAuthService.login();
      } else {
        this.LoginAuthService.loggedIn.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  saveUser() {
    const data = this.user;
    this.userService.create(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
