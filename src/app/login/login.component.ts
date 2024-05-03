import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // username: string = '';
  password: string = '';
  email: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  login() {
    if (this.email.length > 0 && this.password.length > 0) {
      this.dataService.authLogin({ email: this.email, password: this.password }).subscribe((response) => {
        if (response.data) {
          sessionStorage.setItem('username', this.email);
          sessionStorage.setItem('token', response.data.token);
          this.router.navigate(['/']);
        }
      },
        (error) => {
          console.log(error);
          alert('Invalid credentials');
        }
      );
    }
    else {
      alert('Please fill the form');
    }
  }
  signup() {
    this.router.navigate(['/signup']);
  }
}
