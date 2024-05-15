import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationData, LoginData } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  url = 'http://localhost:3000/api/user/'

  constructor(private http: HttpClient) { }


  register(data: RegistrationData): void {
    this.http.post(this.url + "register", data).subscribe(res=> console.log(res))
  }

  login(data: LoginData): void {
    this.http.post(this.url + "login", data)
  }

}
