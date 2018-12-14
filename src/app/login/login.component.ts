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
