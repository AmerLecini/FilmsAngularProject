import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUserEmail');
    if (storedUser) {
      this.user.next(new User(storedUser, ''));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any>('http://localhost:3000/signUpUsers').pipe(
      map((res) => {
        const user = res.find(
          (a: any) => a.email === email && a.password === password
        );
        if (user) {
          localStorage.setItem('currentUserEmail', user.email);
          this.user.next(new User(user.email, user.id));
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUserEmail');
    this.user.next(null);
  }
}
