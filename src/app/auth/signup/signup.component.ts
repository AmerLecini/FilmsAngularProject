import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('\\d{10}'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      if (
        this.signupForm.hasError('required', [
          'fullname',
          'email',
          'password',
          'mobile',
        ])
      ) {
        alert('Please fill out all required fields.');
      } else if (this.signupForm.hasError('minlength', 'password')) {
        alert('Password must be at least 8 characters long.');
      } else if (this.signupForm.hasError('pattern', 'mobile')) {
        alert('Please enter a valid 10-digit mobile number.');
      } else if (this.signupForm.hasError('minlength', 'fullname')) {
        alert('Fullname must be at least 3 characters long..');
      } else if (this.signupForm.hasError('email', 'email')) {
        alert('Please enter a valid email address.');
      } else {
        alert('Please correct the form errors.');
      }
      return;
    }

    this.http
      .post<any>('http://localhost:3000/signUpUsers', this.signupForm.value)
      .subscribe(
        (res) => {
          alert('Signup Successful');
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
  }
}
