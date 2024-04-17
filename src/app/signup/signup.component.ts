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
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      alert('All fields are required');
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
