import { Component, OnInit } from '@angular/core';
import { FilmsModel } from '../models/films_model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;
  filmlist: FilmsModel[] = [];
  filterfilm: FilmsModel[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  isLoginPage(): boolean {
    return this.router.url.includes('login');
  }

  isSignupPage(): boolean {
    return this.router.url.includes('signup');
  }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('currentUserEmail');
  }

  logout() {
    localStorage.removeItem('currentUserEmail');
    this.authService.user.next(null);
    this.router.navigate(['/login']);
  }

  goToHeader() {
    this.router.navigate(['/films']).then(() => {
      window.location.reload();
    });
  }
}
