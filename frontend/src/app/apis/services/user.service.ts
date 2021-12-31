import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    urlImage: ''
  };

  private readonly url = environment.apiBaseUrl;

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(
      `${this.url}register`,
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
      `${this.url}authenticate`,
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(`${this.url}userProfile`);
  }

  getUser(id: string) {
    return this.http.get(`${this.url}${id}`);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
