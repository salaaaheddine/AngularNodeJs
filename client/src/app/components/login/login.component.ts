import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  email = '';
  password = '';
  errorMessage = '';

  ngOnInit(): void {
      
  }

  onSubmit() {
    // Implement your login logic here
    // This example just simulates successful login
    this.email = '';
    this.password = '';
    // You might redirect to another page or perform other actions
  }
}
