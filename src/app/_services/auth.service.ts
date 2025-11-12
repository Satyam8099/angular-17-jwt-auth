import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// 🛑 THE FIX IS HERE: ADDED THE MISSING '/'
const AUTH_API = 'https://crudwebapi-e8bxg7dzbyffdjhp.canadacentral-01.azurewebsites.net/api/User/'; 
// It was: 'https:/crudwebapi-...'

export interface User {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  address?: string;
  age: number;
  role?: string;
  image?: [{ fileName: string; imageData: string }];
}

export interface LoginRequest {
  email: string;
  password: string;
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  loginUser(login: LoginRequest): Observable<User> {
    // This will now correctly call:
    // https://crudwebapi-e8bxg7dzbyffdjhp.canadacentral-01.azurewebsites.net/api/User/login
    return this.http.post<User>(`${AUTH_API}login`, login, httpOptions); 
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(AUTH_API, user, httpOptions);
  }


  logout(): Observable<any> {
    // Note: The logout endpoint is currently pointing to 'https://yourapi.com/data'.
    // You should update this to point to the correct logout or data endpoint on your Azure API.
    return this.http.get('https://yourapi.com/data')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    switch (error.status) {
      case 400:
        errorMessage = 'Bad request. Please check your input.';
        break;
      case 500:
        errorMessage = 'Internal server error. Please try again later.';
        break;
      case 204:
        errorMessage = 'No content available.';
        break;
      default:
        errorMessage = 'Something went wrong.';
    }
    return throwError(() => new Error(errorMessage));
  }
}