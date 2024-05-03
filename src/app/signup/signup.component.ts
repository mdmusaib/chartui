import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private dataService: DataService) { }

  signup() {
    // Additional validation can be added here
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Call authentication service to sign up
    this.dataService.register({ name: this.username, email: this.email, password: this.password }).subscribe((response) => {
      if (response.data) {
        alert('User Created Successfully!');
        this.router.navigate(['/login']);
      }
    },
      (error) => {
        console.log(error);
        alert('Something Went Wrong');
      }
    );



  }
}
