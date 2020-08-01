import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getLoginFormData } from './helperFunctions/getLoginFormData';
import { LoginUserService } from 'src/app/services/http-requests/login-user.service';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss','../styles/auth_form.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private route: Router,
    public loginUser: LoginUserService,
    private userAuthDataService: UserAuthDataService
  ) {}

  ngOnInit(): void {}

  /**
   * If form is valid, naviagate to homepage
   */
  handleLoginSubmit = () => {
    let postData = getLoginFormData(this.loginForm);
    if (this.loginForm.valid) {
      let loginAttempt = this.loginUser.postLoginUser(postData);
      loginAttempt.subscribe(
        (responseData:any) => {
          if (responseData.token) {
            localStorage.setItem('token',responseData.token)
            this.userAuthDataService.setToken(responseData.token);
            this.userAuthDataService.setUsername(postData.username)
            this.loginUser.handleRequestSuccess();
            this.route.navigate(['/']);
          } else {
            this.loginUser.handleRequestError();
          }
        },
        (error) => {
          this.loginUser.handleRequestError();
          console.log('error', error);
        }
      );
    }
  };
}
