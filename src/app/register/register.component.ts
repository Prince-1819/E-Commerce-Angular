import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  formError: string = '';
  emailError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  validateEmail(email: string): boolean {
    // Basic email format validation using regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  handleEmailChange(email: string): void {
    this.email = email;

    // Validate email as the user types
    if (!this.validateEmail(email)) {
      this.emailError = 'Invalid email format';
    } else {
      this.emailError = '';
    }
  }

  handleSubmit(): void {
    // Reset errors
    this.emailError = '';
    this.formError = '';

    // Validate email
    if (!this.email) {
      this.emailError = 'Email is required';
      return;
    } else if (!this.validateEmail(this.email)) {
      this.emailError = 'Invalid email format';
      return;
    }

    // Validate password
    if (!this.password) {
      this.formError = 'Password is required';
      return;
    }

    // Validate username
    if (!this.username) {
      this.formError = 'Username is required';
      return;
    }

    // Call AuthService to register
    this.authService.registerUser(this.username, this.email, this.password).subscribe(
      userData => {
        console.log('User registered:', userData);

        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(userData._id));

        // Navigate to the desired route after successful registration
        this.router.navigate(['/login']);

        // Optionally, you can set a success message or perform other actions here
      },
      error => {
        console.error('Registration error:', error);

        // Display appropriate error message based on error response
        if (error === 'user already exists.') {
          this.formError = 'User already exists.';
        } else {
          this.formError = 'Registration failed. Please try again.';
        }
      }
    );
  }

}
