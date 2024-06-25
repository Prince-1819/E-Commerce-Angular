import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';
  // private isLogin = false

  private isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public login$: Observable<boolean> = this.isLogin.asObservable();

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string) {
    const endpoint = `${this.apiUrl}/api/auth/signin`;
    return this.http.post<any>(endpoint, { email, password }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error); // Rethrow the error
      })
    );
  }
  get login(): boolean {
    return this.isLogin.value;
  }

  set login(flag: boolean) {
    this.isLogin.next(flag);
  }

  registerUser(name: string, email: string, password: string) {
    const endpoint = `${this.apiUrl}/api/auth/signup`;
    return this.http.post<any>(endpoint, { name, email, password }).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(error); // Rethrow the error
      })
    );
  }

}
