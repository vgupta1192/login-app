# Angular login with Authentication & Form Validation
Login Page App based on angular 6.

## Demo
You may want to have a look at the demo https://vgupta1192.github.io/login-app/

## Adding the component in your project
```
<app-root</app-root>
```
### Dependencies
```
npm install jquery --save
npm install bootstrap --save
```
### Login Credentials
```
User Name: admin
Password : admin123
```
### Services
```
The service call for logging out the admin and removing the token.

1. auth.service.ts
```
### auth.service.ts
``` typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }
}
```
### login.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login = { userid: 'admin', password: 'admin123' };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted: boolean;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.submitted = false;
    this.loading = false;
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.f.userid.value === this.model.userid && this.f.password.value === this.model.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.f.userid.value);
        this.router.navigate([this.returnUrl]);
      } else {
        this.loading = false;
        this.message = 'Please check your userid and password';
      }
    }
  }
  reset() {
    this.loginForm.reset();
  }
}
```
### login.component.html
``` typescript
<div class="container">
    <div class="col-md-6 col-md-offset-3 loginDialog">
        <p class="lead">Login Form</p>
        <p *ngIf="message" class="text-center error">{{message}}</p>
      <form [formGroup]="loginForm" (ngSubmit)="login()">
          <div class="form-group clearfix" [ngClass]="{ 'has-error': submitted && f.userid.errors }">
              <label for="userid" class="col-md-3 col-sm-5 col-xs-12">User Name</label>
              <div class="col-md-9 col-sm-7 col-xs-12">
                  <input type="text" class="form-control" formControlName="userid" />
                  <div *ngIf="submitted && f.userid.errors" class="help-block">
                        <div *ngIf="f.userid.errors.required">User Name is required</div>
                  </div>
              </div>
          </div>
          <div class="form-group clearfix" [ngClass]="{ 'has-error': submitted && f.password.errors }">
            <label for="password" class="col-md-3 col-sm-5 col-xs-12">Password</label>
            <div class="col-md-9 col-sm-7 col-xs-12">
                <input type="password" class="form-control" formControlName="password"/>
                <div *ngIf="submitted && f.password.errors" class="help-block">
                        <div *ngIf="f.password.errors.required">Password is required</div>
                </div>
            </div>
          </div>
          <div class="col-xs-12 form-group text-right">
            <button class="btn btn-success btn-lg" type="submit">Login</button>
            <button class="btn btn-primary btn-lg resetMargin" type="submit" (click)="reset()">Reset</button>
          </div>
      </form>
    </div>
</div>
```
