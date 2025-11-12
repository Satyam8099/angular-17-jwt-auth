import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https:/crudwebapi-e8bxg7dzbyffdjhp.canadacentral-01.azurewebsites.net/api/User/';

export interface ImageData {
  id: number;
  fileName: string;
  imageData: string;
}


export interface User {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  address?: string;
  age: number;
  role?: string;
  image?: ImageData[];
}
export interface LoginRequest {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
private apiUrl = 'https://localhost:7061/api';

  // Public endpoint to check server status or simple data
  getPublicContent(): Observable<User> {
    return this.http.get<User>(API_URL +'/User' + '/check');
  }
  // Get all users (if authorized)
  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/User' + '/all');
  }

  // Get details of a single user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/User/${id}`);
  }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post(API_URL+'/User' , user);
  }

  // Update an existing user
  updateUser(user: any): Observable<any> {
    return this.http.put(this.apiUrl + '/User', user);
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/User/${id}`);
  }

  loginUser(login: LoginRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/User/login`, login);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Matches the 'file' property in OpenAPI spec
    return this.http.post(`${this.apiUrl}/Images/upload`, formData);
  }
  // Get all images
  getImages(): Observable<ImageData[]> {
    return this.http.get<ImageData[]>(`${this.apiUrl}/Images/all`);
  }
}