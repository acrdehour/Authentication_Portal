import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = '/api/auth';

  login(username: string, password: string) {

    const body = {

        username,

        password

    };

    return this.http.post(

        `${this.apiUrl}/login`,

        body

    );

  }

  register(username: string, password: string){

    const body = {

        username,

        password

    };

    return this.http.post(

        `${this.apiUrl}/register`,

        body

    );

  }

  getMe() {
    return this.http.get(`${this.apiUrl}/me`);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}