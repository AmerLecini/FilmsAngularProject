import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      if (this.loginForm.hasError('required', ['email', 'password'])) {
        alert('Please enter both email and password.');
      } else if (this.loginForm.hasError('minlength', 'password')) {
        alert('Password must be at least 8 characters long.');
      } else if (this.loginForm.hasError('email', 'email')) {
        alert('Please enter a valid email address.');
      } else {
        alert('Please enter valid email and password.');
      }
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['films']).then(() => {
          window.location.reload();
        });
      } else {
        alert('User not found');
      }
    });
  }
}
