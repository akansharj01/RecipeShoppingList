import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService, AuthResponseData } from './authentication-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth-component.html',
  })
export class AuthComponent {
    constructor(private authService: AuthenticationService, private router: Router) {}

    isLoginMode = true;
    isLoadingSpinner = false;
    error: String = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    
    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;
        this.isLoadingSpinner = true;
        if(this.isLoginMode) {
            authObs = this.authService.login(email,password);
        } else {
            authObs = this.authService.signUp(email,password);
        }
        authObs.subscribe(
            response => {
                this.router.navigate(['/recipes']);
                console.log(response);
                this.isLoadingSpinner = false;
            }, errorMsg => {
                this.error = errorMsg;
                this.isLoadingSpinner = false;
            }
        );
        form.reset();
    }

    onCloseAlert() {
        this.error = null;
    }
}