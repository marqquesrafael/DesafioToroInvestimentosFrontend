import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new Login;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  login() {
    this.user.email = this.loginForm.value.email
    this.user.password = this.loginForm.value.password

    this.authService.login(this.user).subscribe(
      {
        next: (res: Token) => {
          localStorage.setItem('authToken', `${res.tokenType} ${res.token}`);
          this.router.navigate([''])
        },
        error: (err) => {
          this.toastr.warning(err.error);
        }
      }
    );

  }
}
