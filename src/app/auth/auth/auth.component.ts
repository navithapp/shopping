import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isLoginMode = false;
  isLoading = false;
  error: string = null;

  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if(this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else{
      authObs = this.authService.signUp(email,password)
    }
    authObs.subscribe((authResponse) => {
      console.log(authResponse);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error= errorMessage
      console.log(errorMessage);
      this.isLoading = false;
    });
    form.reset();
  }

  handleError() {
    this.error = null;
  }

}
